import fs from "fs"; //file system, dosyalarla konuşmamızı sağlayan Node.js kütüphanesi

const tr = JSON.parse(
    fs.readFileSync( // tr.json'ı aç içindekileri oku bana getir
      "src/shared/locales/tr.json",  "utf8")
  );

  const en = JSON.parse(
    fs.readFileSync("src/shared/locales/en.json", "utf8")
  );

  function getKeys(obj, parentKey = "") {
    const keys = [];
  
    for (const key in obj) {
      const fullKey = parentKey
        ? `${parentKey}.${key}`
        : key;
  
      if (
        typeof obj[key] === "object" &&
        obj[key] !== null
      ) {
        const childKeys = getKeys(
          obj[key],
          fullKey
        );
  
        keys.push(...childKeys);
      } else {
        keys.push(fullKey);
      }
    }
  
    return keys;
  }

    const trKeys = getKeys(tr);
    const enKeys = getKeys(en);

const missingInEn = trKeys.filter(
    (key) => !enKeys.includes(key)
  );
  
  const missingInTr = enKeys.filter(
    (key) => !trKeys.includes(key)
  );
  
  console.log("Missing in en.json:");
  console.log(missingInEn);
  
  console.log("Missing in tr.json:");
  console.log(missingInTr);
