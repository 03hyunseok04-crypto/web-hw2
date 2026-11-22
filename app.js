let sumA = 0;

for (let i = 0; i < ratings.length; i++) {
    sumA += ratings[i];
}

let averageA = sumA / ratings.length;

console.log("A1 평균 평점: " + averageA);


let maxA = 0;

for (let i = 1; i < ratings.length; i++) {
    if (ratings[i] > ratings[maxA]) {
        maxA = i;
    }
}

console.log(
    "A2 최고 평점: " + titles[maxA] + " " + ratings[maxA]
);


let countA = 0;

for (let i = 0; i < ratings.length; i++) {
    if (ratings[i] >= 8) {
        countA++;
    }
}

console.log("A3 8점 이상: " + countA + "편");


let count2020A = 0;
let count2010A = 0;
let count2000A = 0;
let countBeforeA = 0;

for (let i = 0; i < years.length; i++) {

    const year = parseInt(years[i]);
    const decade = year - (year % 10);

    switch (decade) {
        case 2020:
            count2020A++;
            break;

        case 2010:
            count2010A++;
            break;

        case 2000:
            count2000A++;
            break;

        default:
            countBeforeA++;
            break;
    }
}

console.log(
    "A4 2020년대 " + count2020A +
    "편, 2010년대 " + count2010A +
    "편, 2000년대 " + count2000A +
    "편, 그 이전 " + countBeforeA + "편"
);


let bigA = "";

for (let i = 0; i < audiences.length; i++) {
    if (audiences[i] >= 1000000) {
        bigA += titles[i] + " ";
    }
}

if (bigA === "") {
    bigA = "없음";
}

console.log("A5 관객 100만 이상: " + bigA);


function average(list) {
    return averageBy(list, "rating");
}


function best(list) {

    let max = 0;

    for (let i = 1; i < list.length; i++) {

        if (list[i].rating > list[max].rating) {
            max = i;
        }

    }

    return list[max];
}


function filterByRating(list, min) {

    return list.filter(m => m.rating >= min);

}


function sortBy(list, key, desc) {

    const sign = desc ? -1 : 1;

    return [...list].sort((a, b) => {

        if (typeof a[key] === "string") {
            return sign * a[key].localeCompare(b[key]);
        } else {
            return sign * (a[key] - b[key]);
        }

    });

}


function search(list, keyword) {

    const word = keyword.trim().toLowerCase();

    return list.filter(m =>
        m.title.toLowerCase().includes(word)
    );

}

function formatNumber(number) {

    return Number(number).toLocaleString("ko-KR");

}


function yearsSince(dateString) {

    const year = new Date(dateString).getFullYear();
    const currentYear = new Date().getFullYear();

    return currentYear - year;

}



function getList(data) {

    return data.results;

}


function averageBy(list, key) {

    let sum = 0;

    for (let i = 0; i < list.length; i++) {
        sum += list[i][key];
    }

    return sum / list.length;

}


const bestMovie = best(movies);

const topMovie = sortBy(movies, "audience", true)[0];

document.getElementById("out").textContent =
    "전체 영화 " + movies.length +
    "편, 평균 평점 " + average(movies).toFixed(1) + "점\n" +

    "최고 평점 영화: " + bestMovie.title +
    " (" + bestMovie.rating + "점, 개봉한 지 " +
    yearsSince(bestMovie.date) + "년)\n" +

    "관객 1위: " + topMovie.title +
    " (누적 " + formatNumber(topMovie.audience) + "명)";


// TMDB 현재 상영작
const nowPlaying = getList(TMDB);


// C1
console.log(
    "C1 페이지: " + TMDB.page +
    ", 전체 페이지: " + TMDB.total_pages +
    ", 전체 영화: " + TMDB.total_results +
    ", 이번 응답 영화 수: " + nowPlaying.length
);


// C2
console.log(
    "C2 상영작 평균 평점: " +
    averageBy(nowPlaying, "vote_average").toFixed(1)
);


// C3
console.table(
    sortBy(nowPlaying, "vote_average", true).slice(0, 5),
    ["title", "release_date", "vote_average"]
);


// C4
console.log(
    "C4 검색 결과: " +
    search(nowPlaying, "Heart of the Beast").length +
    "편"
);