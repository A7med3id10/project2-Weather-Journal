document.addEventListener("DOMContentLoaded", () => {
    const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
    const apiKey = '<YOUR_API_KEY>&units=imperial';
    const generate = document.getElementById("generate");
    const date = document.getElementById("date");
    const temp = document.getElementById("temp");
    const content = document.getElementById("content");
    generate.addEventListener("click", performAction);

    function performAction() {
        const cityCode = document.getElementById("zip").value;
        const feelings = document.getElementById("feelings").value;
        content.innerHTML = feelings;
        getAPI(baseURL, cityCode, apiKey)
            .then((data) => {
                updateUI(data)
                getData
                postData("/weather", { temp: data.main.temp, date: Date(), userResponse: feelings, })
            })
    }
    //function to fetch API
    const getAPI = async(baseURL, Zip, key) => {
        const res = await fetch(baseURL + Zip + key)
        try {
            const data = await res.json();
            console.log(data)
            return data;
        } catch (error) {
            console.log("error", error);
        }
    }

    //function to get Data
    const getData = async() => {
        const res = await fetch("/weather")
        try {
            const data = await res.json();
            console.log(data)
            return data;
        } catch (error) {
            console.log("error", error);
        }
    }

    //function to post Data
    const postData = async(url = "/weather", data = {}) => {
        console.log(data)
        const response = await fetch(url, {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        try {
            const newData = await response.json();
            console.log(newData);
            return newData
        } catch (error) {
            console.log("error", error);
        }
    }

    //function to update UI
    const updateUI = async(data) => {
        const request = await fetch("/weather");
        try {
            const allData = await request.json();
            temp.innerHTML = `Temperature: ${Math.round(data.main.temp-273)}°C`;
            let d = new Date();
            let newDate = `Date: ${d.getMonth()+1}.${d.getDate()}.${d.getFullYear()}`;
            date.innerHTML = newDate;
        } catch (error) {
            console.log("error", error);
        }
    }
})