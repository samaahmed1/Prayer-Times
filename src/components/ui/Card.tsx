import Prayer from "./Prayer";
import { useState, useEffect } from "react";

type Timings = {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
};

const Card = () => {
  const [prayersTime, setPrayersTime] = useState<Timings>({} as Timings);
  const [prayerDate, setPrayerDate] = useState("");
  const [city, setCity] = useState("Monufia");

  const cities = [
    { value: "Monufia", name: "المنوفية" },
    { value: "Cairo", name: "القاهرة" },
    { value: "Alexandria", name: "الإسكندرية" },
    { value: "Aswan", name: "أسوان" },
    { value: "Luxor", name: "الأقصر" },
    { value: "Port Said", name: "بورسعيد" },
    { value: "Suez", name: "السويس" },
    { value: "Ismailia", name: "الإسماعيلية" },
    { value: "Tanta", name: "طنطا" },
    { value: "Minya", name: "المنيا" },
    { value: "Hurghada", name: "الغردقة" },
    { value: "Sharm El Sheikh", name: "شرم الشيخ" },
  ];

  useEffect(() => {
    const fetchDtataPrayer = async () => {
      const response = await fetch(`https://api.aladhan.com/v1/timingsByCity/03-09-2024?city=Eg&country=${city}`);
      const dataPrayer = await response.json();
      setPrayersTime(dataPrayer.data.timings);
      // console.log(dataPrayer.data);

      setPrayerDate(dataPrayer.data.date.hijri.date);
      // console.log(dataPrayer.data.date.hijri.date);
    };
    fetchDtataPrayer();
  }, [city]);

  const handleCity = (e: React.ChangeEvent<HTMLSelectElement>) => {
    return setCity(e.target.value);
  };
  // console.log(city);

  const formateTime = (time: string) => {
    if (!time) return "00 : 00";
    const [rawHours, rawMinutes] = time.toString().split(":").map(Number);
    let hours: number = rawHours;
    const minutes: number = rawMinutes;
    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    const minutesFinal: string = minutes < 10 ? "0" + minutes : minutes.toString();
    return `${hours} : ${minutesFinal} ${period}`;
  };

  return (
    <section>
      <div className="container w-[330px] sm:w-[650px] bg-[#332a224e] py-7 px-5 rounded-md border-2 border-[#d7d7d74e] text-white backdrop-blur-sm font-sans">
        <div className="top border-b-2 border-[rgba(215,215,215,0.31)] flex justify-between items-center gap-5 flex-col sm:flex-row text-center sm:text-end pb-7">
          <div className="flex justify-between w-full sm:w-fit flex-row-reverse sm:flex-col gap-3">
            <h2 className="text-xl">التاريخ</h2>
            <p className="text-md font-semibold">{prayerDate}</p>
          </div>
          <div className="flex justify-between w-full sm:w-fit flex-row-reverse sm:flex-col gap-3">
            <h2 className="text-xl">المدينة</h2>
            <select className="text-md outline-0 bg-[#a34d36] border-1 border-[#d7d7d74e] rounded-sm w-[200px] p-2" name="city" id="city" onChange={handleCity}>
              {cities.map((city) => {
                return (
                  <option key={city.value} value={city.value}>
                    {city.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="bottom pt-7 text-xl flex flex-col gap-3">
          <Prayer name=":الفجر" time={formateTime(prayersTime.Fajr)} />
          <Prayer name=":الظهر" time={formateTime(prayersTime.Dhuhr)} />
          <Prayer name=":العصر" time={formateTime(prayersTime.Asr)} />
          <Prayer name=":المغرب" time={formateTime(prayersTime.Maghrib)} />
          <Prayer name=":العشاء" time={formateTime(prayersTime.Isha)} />
        </div>
      </div>
    </section>
  );
};

export default Card;
