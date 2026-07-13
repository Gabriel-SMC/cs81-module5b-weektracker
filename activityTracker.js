const weekData = [
    {day: "Monday", activity: "studying", category: "education", hoursSpent: "5", enjoyment: "4", timeOfDay: "morning"},
    {day: "Tuesday", activity: "drawing", category: "productivity", hoursSpent: "5", enjoyment: "8", timeOfDay: "afternoon"},
    {day: "Wednesday", activity: "bycicling", category: "physical activity", hoursSpent: "4", enjoyment: "9", timeOfDay: "afternoon"},
    {day: "Thursday", activity: "writing", category: "productivity", hoursSpent: "4", enjoyment: "5", timeOfDay: "morning"},
    {day: "Friday", activity: "drawing", category: "productivity", hoursSpent: "6", enjoyment: "7", timeOfDay: "evening"},
    {day: "Saturday", activity: "playing video games", category: "entertainment", hoursSpent: "8", timeOfDay: "evening"},
    {day: "Sunday", activity: "baking", category: "cooking", hoursSpent: "4", enjoyment: "9", timeofDay: "afternoon"},
]

// Baking will have the highest enjoyment.
// Productivity will dominate my week.
// My activities mostly take place in the afternoon.

function getTotalPhysicalHours(data) {
    return data
        .filter(item => item.category === "physical activity")
        .reduce((total, item) => total + Number(item.hoursSpent), 0);
}

function getAverageEnjoymentByTime(data) {
    const summary = data
        .filter(item => item.enjoyment !== undefined)
        .reduce((acc, item) => {
            const time = item.timeOfDay || item.timeofDay;
            if (!acc[time]) {
                acc[time] = { totalScore: 0, count: 0 };
            }
            acc[time].totalScore += Number(item.enjoyment);
            acc[time].count += 1;
            return acc;
        }, {});

    const averages = {};
    for (const time in summary) {
        averages[time] = Math.round(summary[time].totalScore / summary[time].count)
    }
    return averages;
}

function getMostCommonCategory(data) {
    const frequencyMap = data.reduce((acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + 1;
        return acc;
    }, {});
    return Object.keys(frequencyMap).reduce((maxCategory, currentCategory) => {
        return frequencyMap[currentCategory] > (frequencyMap[maxCategory] || 0) 
            ? currentCategory 
            : maxCategory;
    }, "");
}

function getLowHoursHighEnjoyment(data) {
    return data
        .filter(item => {
            if (!item.enjoyment) return false; 
            return Number(item.hoursSpent) <= 4 && Number(item.enjoyment) >= 7;
        })
        .map(item => item.activity);
}

console.log(`Total Physical Hours: ${getTotalPhysicalHours(weekData)} hours`);
console.log(`Average Enjoyment by Time: ${JSON.stringify(getAverageEnjoymentByTime(weekData))}`);
console.log(`Most Common Category: ${getMostCommonCategory(weekData)}`);
console.log(`Lowest Hours with Highest Activity Enjoyment: ${getLowHoursHighEnjoyment(weekData)}`);