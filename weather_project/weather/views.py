import requests
from django.http import JsonResponse
from django.conf import settings

def get_weather_and_forecast(request):
    city = request.GET.get('city', 'Nairobi')
    days = request.GET.get('days', 3)  # default 3-day forecast

    url = f"http://api.weatherapi.com/v1/forecast.json?key={settings.WEATHER_API_KEY}&q={city}&days={days}&aqi=no&alerts=no"
    data = requests.get(url).json()

    cleaned = {
        "location": {
            "name": data.get("location", {}).get("name"),
            "region": data.get("location", {}).get("region"),
            "country": data.get("location", {}).get("country")
        },
        "current": {
            "temperature_c": data.get("current", {}).get("temp_c"),
            "temperature_f": data.get("current", {}).get("temp_f"),
            "condition": data.get("current", {}).get("condition", {}).get("text"),
            "icon": data.get("current", {}).get("condition", {}).get("icon"),
            "humidity": data.get("current", {}).get("humidity"),
            "wind_kph": data.get("current", {}).get("wind_kph"),
            "wind_dir": data.get("current", {}).get("wind_dir")
        },
        "forecast": []
    }

    for day in data.get("forecast", {}).get("forecastday", []):
        cleaned["forecast"].append({
            "date": day.get("date"),
            "avg_temp_c": day.get("day", {}).get("avgtemp_c"),
            "avg_temp_f": day.get("day", {}).get("avgtemp_f"),
            "condition": day.get("day", {}).get("condition", {}).get("text"),
            "icon": day.get("day", {}).get("condition", {}).get("icon"),
            "max_temp_c": day.get("day", {}).get("maxtemp_c"),
            "min_temp_c": day.get("day", {}).get("mintemp_c"),
            "humidity": day.get("day", {}).get("avghumidity"),
            "wind_kph": day.get("day", {}).get("maxwind_kph"),
        })

    return JsonResponse(cleaned)
