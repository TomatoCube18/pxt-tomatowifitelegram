
/**
 *  TomatoWifiTelegram blocks
 */

let TomatoWifiConnected = 0
let weatherKey = 0

let _main = ""
let _temperature = 0
let _pressure = 0
let _humidity = 0
let _visibility = 0
let _uvindex = 0
let _cloudpct = 0
let _windspeed = 0
let _winddegree = 0
let _rain = 0
let _snow = 0

let _day = 0
let _hour = 0
let _minute = 0
let _second = 0

let _chatMsg = ""
let _chatIDVal = ""


/**
 * Blocks
 */
//% weight=100 color=#f39c12 icon="\uf3fe" block="TomatoWifiTelegram"

namespace TOMATOWIFITELEGRAM {
    
    //% block="Send single line message %msgString to Telegram ChatID $chatID" 
    export function sendTelegramMsg(msgString: string, chatID: string) {
        serial.writeString("S" + chatID + "," + msgString + "\n")
        basic.pause(100)
    }

    //% block="Is valid Telegram Message %receivedString" 
    export function isTelegramMsgTrue(receivedString: string):boolean { //TELEGRAM=-385342091,Testing
        if (receivedString.includes("TELEGRAM=") && TomatoWifiConnected) { 
            _chatIDVal = receivedString.substr(receivedString.indexOf("=") + 1, receivedString.indexOf(",") - receivedString.indexOf("=") - 1)
            _chatMsg = receivedString.substr(receivedString.indexOf(",") + 1, receivedString.length() - receivedString.indexOf(",") - 2)
            return true
        } else {
            return false
        }
    }

    //% block="Get Last Telegram ChatID Value" 
    export function getchatIDVal():string {
            return _chatIDVal
    }
    
    //% block="Get Last Telegram Message" 
    export function getBlynkPin():string {
            return _chatMsg
    }

    //% block="Send single line message %msgString to USB console" 
    export function sendConsoleMsg(msgString: string) {
        serial.writeString("c"+ msgString + "\n")
        basic.pause(100)
    }

    //% block="Connect Wifi to SSID %ssid with a passcode %passcode with a Telegram BotId of %botid and a TimeZone of %timezone Ready indication %readyImg" 
    //% ssid.defl=MySSID passcode.defl=MyPasscode botid.defl=TelegramBotID, readyImg.defl = false
    export function connectWifi(ssid: string, passcode: string, botid: string, timezone: number, readyImg: boolean) {
        basic.showLeds(`
                . . . . .
                . . . . .
                . . . . .
                . . . . .
                . . . . .
                `)
        serial.writeString("2\n")
        basic.pause(200)
        serial.writeString(timezone.toString() + "\n")
        basic.pause(200)
        serial.writeString(botid + "\n")
        basic.pause(200)
        serial.writeString(ssid + "\n")
        basic.pause(200)
        serial.writeString(passcode + "\n")
        basic.pause(200)
        serial.writeString("0\n")
        basic.pause(200)
        TomatoWifiConnected = 1

        if (readyImg)
            basic.showIcon(IconNames.Yes)
        
    }

    //% block="Init Wifi UART pin to 15 & 16, Ready indication %readyImg" 
    export function initWifi(readyImg: boolean) {
        TomatoWifiConnected = 0
        serial.redirect(
                SerialPin.P16,
                SerialPin.P15,
                BaudRate.BaudRate115200
        )
        serial.setRxBufferSize(128)
        serial.setTxBufferSize(128)
        basic.pause(1000)
        if (readyImg)
            basic.showIcon(IconNames.Yes)

    }
}
/**
 * Blocks
 */
//% weight=100 color=#34495e icon="\uf017" block="TomatoWifiNTPTime"

namespace TOMATOWIFINTPTIME {
    
    //% block="Get NTP Second."
    export function getNTPSecond():number {
            return _second
    }
       
    //% block="Get NTP Minute."
    export function getNTPMinute():number {
            return _minute
    }
    
    //% block="Get NTP Hour in 24hrs format."
    export function getNTPHour():number {
            return _hour
    }

    //% block="Get NTP Day, e.g. Sunday = 0, Monday = 1."
    export function getNTPDay():number {
            return _day
    }

    //% block="Is valid Time from NTP %receivedString" 
    export function isNTPTimeTrue(receivedString: string):boolean {
        if (receivedString.includes("TIME=D") && receivedString.includes("dH") && receivedString.includes("hM") && TomatoWifiConnected) {
            _day = parseInt(receivedString.substr(receivedString.indexOf("D") + 1, receivedString.indexOf("d") - receivedString.indexOf("D") - 1),10)
            _hour = parseInt(receivedString.substr(receivedString.indexOf("H") + 1, receivedString.indexOf("h") - receivedString.indexOf("H") - 1),10)
            _minute = parseInt(receivedString.substr(receivedString.indexOf("hM") + 2, receivedString.indexOf("m") - receivedString.indexOf("hM") - 2),10)
            _second = parseInt(receivedString.substr(receivedString.indexOf("S") + 1, receivedString.indexOf("s") - receivedString.indexOf("S") - 1),10)
            return true
        } else {
            return false
        }
    }

    //% block="Request time from NTP Service"
    export function requestTime() {
        _day = 0
        _hour = 0
        _minute = 0
        _second = 0
        serial.writeString("T?\n")
        basic.pause(100)
    }

}


/**
 * Blocks
 */
//% weight=100 color=#8e44ad icon="\uf2ca" block="TomatoWifiOpenWeather"

namespace TOMATOWIFIOPENWEATHER {

    //% block="Get OpenWeatherMap Snow Volume in mm"
    export function getOpenWeatherSnowVolumeInMilimeters():number {
            return _snow
    }

    //% block="Get OpenWeatherMap Precipitation Volume in mm"
    export function getOpenWeatherPrecipitationVolumeInMilimeters():number {
            return _rain
    }
    
    //% block="Get OpenWeatherMap Wind Direction"
    export function getOpenWeatherWindDirection():number {
            return _winddegree
    }

    //% block="Get OpenWeatherMap Wind Speed in m/s"
    export function getOpenWeatherWindSpeed():number {
            return _windspeed
    }
    
    //% block="Get OpenWeatherMap UV Index"
    export function getOpenWeatherUVIndex():number {
            return _uvindex
    }
    
    //% block="Get OpenWeatherMap Average Visibility in m"
    export function getOpenWeatherAverageVisibilityInMeters():number {
            return _visibility
    }

    //% block="Get OpenWeatherMap Cloudiness in percent"
    export function getOpenWeatherCloudinessInPercent():number {
            return _cloudpct
    }

    //% block="Get OpenWeatherMap Humidity  in percent"
    export function getOpenWeatherHumidityInPercent():number {
            return _humidity
    }
    
    //% block="Get OpenWeatherMap Atmospheric Pressure in hPa"
    export function getOpenWeatherAtmosphericPressure():number {
            return _pressure
    }

    //% block="Get OpenWeatherMap Temperature in Celcius"
    export function getOpenWeatherTemperature():number {
            return _temperature
    }
    
    //% block="Get OpenWeatherMap Weather Summary"
    export function getOpenWeatherString():string {
            return _main
    }

    //% block="Is valid OpenWeatherMap result %receivedString" 
    export function isOpenWeatherMapTrue(receivedString: string):boolean {
        if (receivedString.includes("WEATHER=T") && receivedString.includes("ms!")) { 
            _temperature = parseFloat(receivedString.substr(receivedString.indexOf("WEATHER=T") + 9, receivedString.indexOf("tP") - receivedString.indexOf("WEATHER=T") - 9))
            _pressure = parseFloat(receivedString.substr(receivedString.indexOf("tP") + 2, receivedString.indexOf("pH") - receivedString.indexOf("tP") - 2))
            _humidity = parseInt(receivedString.substr(receivedString.indexOf("pH") + 2, receivedString.indexOf("hV") - receivedString.indexOf("pH") - 2),10)
            _visibility = parseInt(receivedString.substr(receivedString.indexOf("hV") + 2, receivedString.indexOf("vU") - receivedString.indexOf("hV") - 2),10)
            _uvindex = parseFloat(receivedString.substr(receivedString.indexOf("vU") + 2, receivedString.indexOf("uC") - receivedString.indexOf("vU") - 2))
            _cloudpct = parseInt(receivedString.substr(receivedString.indexOf("uC") + 2, receivedString.indexOf("cWS") - receivedString.indexOf("uC") - 2),10)
            _windspeed = parseFloat(receivedString.substr(receivedString.indexOf("cWS") + 3, receivedString.indexOf("wWD") - receivedString.indexOf("cWS") - 3))
            _winddegree = parseInt(receivedString.substr(receivedString.indexOf("wWD") + 3, receivedString.indexOf("wR") - receivedString.indexOf("wWD") - 3),10)
            _rain = parseFloat(receivedString.substr(receivedString.indexOf("wR") + 2, receivedString.indexOf("rS") - receivedString.indexOf("wR") - 2))
            _snow = parseFloat(receivedString.substr(receivedString.indexOf("rS") + 2, receivedString.indexOf("sMS") - receivedString.indexOf("rS") - 2))
            _main = receivedString.substr(receivedString.indexOf("sMS") + 3, receivedString.indexOf("ms!") - receivedString.indexOf("sMS") - 3)
            
            return true
        } else {
            return false
        }
    }

    //% block="Request weather for a location with a Latitude %lat Longitude %lon using OpenWeatherMap authCode %openweatherid" 
    //% inlineInputMode=external lat.defl=5.41 lon.defl=100.34 openweatherid.defl=OpenWeatherMapAuthCode 
    export function requestWeather(lat: number, lon: number, openweatherid: string) {
        serial.writeString("W=" + openweatherid + "\n")
        basic.pause(150)
         _main = ""
        _temperature = 0
        _pressure = 0
        _humidity = 0
        _visibility = 0
        _uvindex = 0
        _cloudpct = 0
        _windspeed = 0
        _winddegree = 0
        _rain = 0
        _snow = 0
        serial.writeString("C" + lat.toString() + "," + lon.toString() + "\n")
        basic.pause(100)
    }
}
