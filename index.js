import datas from "./data/city.json";

const selectElem = document.querySelector("#area");
const contentElem = document.querySelector("#content");
let WeatherData;

datas.forEach((data) => {
  selectElem.innerHTML += `<option value='{"lat": ${data.latitude},"lon": ${data.longitude}}'>${data.city}, ${data.country}</option>`;
});

function getDayName(dateString) {
  const dateStringStr = String(dateString);

  const year = dateStringStr.slice(0, 4);
  const month = dateStringStr.slice(4, 6);
  const day = dateStringStr.slice(6, 8);

  const formattedDate = new Date(`${year}-${month}-${day}`);

  // Specify the locale (e.g., 'en-US' for English, 'fr-FR' for French)
  const locale = "en-US";

  // Specify the options for formatting the date
  const options = { weekday: "long" };

  // Use Intl.DateTimeFormat to format the date and obtain the day name
  const dayName = new Intl.DateTimeFormat(locale, options).format(
    formattedDate
  );

  return dayName;
}

selectElem.addEventListener("change", () => {
  const value = JSON.parse(selectElem.value);
  contentElem.innerHTML = "";
  fetch(
    `https://www.7timer.info/bin/api.pl?lon=${value.lon}.17&lat=${value.lat}&product=civillight&output=json`,
    { method: "GET" }
  ).then(async (res) => {
    if (res.status !== 200) {
      console.log("Error");
      return;
    }

    await res.json().then((forecast) => {
      forecast["dataseries"].forEach((cast) => {
        contentElem.innerHTML += `<div class="flex flex-wrap flex-col sm:w-2/2 md:w-2/2 lg:w-full xl:w-full mb-3 lg:mb-0 xl:mb-0"">
          <div
            class="bg-red-400 font-bold text-white p-2 items-center text-center space-y-3"
          >
            <p>${getDayName(cast.date)}</p>
            <div class="flex justify-center">
              <img src="/public/assets/${cast.weather}.png" alt="clear" />
            </div>
          </div>
          <div class="bg-sky-700 text-center p-2">
            <p class="text-white mb-5">${cast.weather}</p>
            <p class="text-gray-900 font-semibold text-lg mb-0.5">H: ${
              cast.temp2m.max
            }&deg;C</p>
            <p class="text-gray-900 font-semibold text-lg">L: ${
              cast.temp2m.min
            }&deg;C</p>
          </div>
        </div>`;
      });
    });
  });
});

/*{
    "product": "civillight",
    "init": "2023122100",
    "dataseries": [
        {
            "date": 20231221,
            "weather": "cloudy",
            "temp2m": {
                "max": 10,
                "min": 7
            },
            "wind10m_max": 5
        },
        {
            "date": 20231222,
            "weather": "lightrain",
            "temp2m": {
                "max": 9,
                "min": 6
            },
            "wind10m_max": 5
        },
        {
            "date": 20231223,
            "weather": "cloudy",
            "temp2m": {
                "max": 9,
                "min": 6
            },
            "wind10m_max": 4
        },
        {
            "date": 20231224,
            "weather": "lightrain",
            "temp2m": {
                "max": 10,
                "min": 8
            },
            "wind10m_max": 5
        },
        {
            "date": 20231225,
            "weather": "cloudy",
            "temp2m": {
                "max": 9,
                "min": 7
            },
            "wind10m_max": 4
        },
        {
            "date": 20231226,
            "weather": "cloudy",
            "temp2m": {
                "max": 9,
                "min": 2
            },
            "wind10m_max": 3
        },
        {
            "date": 20231227,
            "weather": "cloudy",
            "temp2m": {
                "max": 9,
                "min": 2
            },
            "wind10m_max": 5
        }
    ]
} */
