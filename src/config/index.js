export const SERVER_URL = process.env.REACT_APP_EGOV_CONTEXT_URL;
export const DEFAULT_BBS_ID = "BBSMSTR_AAAAAAAAAAAA";
export const NOTICE_BBS_ID = "BBSMSTR_AAAAAAAAAAAA";
export const GALLERY_BBS_ID = "BBSMSTR_BBBBBBBBBBBB";

export const options1 = {
    chart: {
        id: "basic-bar1"
    },
    xaxis: { categories: [2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029] },
    tickAmount: 9,
    colors: ['#8BA2C6', "#6178a1"],
    stroke: { width: 1 },
    dataLabels: {
        enabled: true,
        enabledOnSeries: [0, 1],
        offsetX: 0, offsetY: -1

    },
}

export const options3 = {
    chart: {
        id: "basic-bar2"
    },
    xaxis: {
        categories: [2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029],

    },


    yaxis: {
        tickAmount: 3,
        min: 60,
        max: 100,


    },
    //colors: ["#A9E2F3", "#BCF5A9","#31B404","#045FB4",],
    colors: ["#6178a1", "#A4D8AF", "#8BA2C6", "#7CB28D",],

    stroke: { width: 1 },
    dataLabels: {
        enabled: true,
        enabledOnSeries: [0, 1, 2, 3],

    },
}
