import { useState, useEffect, useCallback, useMemo  } from 'react';
import './App.css';

/*
Rules
*Always use the setter for useState
*ทุกครั้งที่ต้องใช้ useState ต้อง * SET * เช่น setNumbers
*Always put a dependency array on useEffect, useCallback, and useMemo
*ทุกครั้งที่ใช้ ข้อมูล array ต้องใช้ พวก useEffect, useCallback, useMemo
*Don't depend on data you set
*always add all the state your read from to the dependency array
*/
function MyComponent(){
  //console เช็ค ตอนแรก ยังไม่ได้ทำงานอะไร
  console.log("MyComponent started");
  const [numbers, setNumbers] = useState([]);
  //console เรียน array มาดูว่ามีค่าไหม
  console.log(`MyComponent numbers=${JSON.stringify(numbers)}`);

  useEffect(() => {
      fetch("/numbers.json")
      .then((resp) => resp.json())
      .then((data) => {
        //console ข้อมูลออกมาตอนการ fetch ข้อมูลจาก array ชื่อไฟล์ numbers.json
        console.log(`data = ${JSON.stringify(data)}`);
        //เอา array data มาใส่ใน useState ที่ชื่อว่า setNumbers
        setNumbers(data);
        console.log("request finished");
      });
  }, []);

    //console ดูว่ากำลังทำงานอยู่
    console.log("MyComponent render");

    //สร้างตัวแปรเพื่อดึงค่า numbers ปัจจุบัน จาก function 
    //ซึ่งก็คือ...currentNumbers แล้วนำมา +1 แล้วใส่กลับไปใน array ผ่าน function
    const addOne = useCallback( () => {
      setNumbers((currentNumbers) => [
        ...currentNumbers,
        currentNumbers.length + 1
      ]);
    }, []);

    // Sum ตั้ง ให้ array + กันทุกครั้งที่ เพิ่มเข้าไปใน numbers ต้องใส่ [numbers] 
    //ทุกครั้งที่ setstate numbers = 0 
    //ไม่งั้น จะขึ้น 0 ทุกครั้ง ที่มีการเพิ่มค่า มันจะไม่บวกกัน
    const sum = useMemo( () => numbers.reduce((a, v) => a + v, 0), [numbers]);

    const out = (
      <div>
        <div>Numbers: {JSON.stringify(numbers)}</div>
        <div>Sum: {sum}</div>
        <button onClick={addOne}>Add One</button>
      </div>
    );
    //console ถ้าทำงานเสร็จให้ขึ้น fisihed
    console.log("MyComponent Finished");

    return out;
}

function App() {
  return (
    <div className="App">
      <MyComponent/>
    </div>
  );
}

export default App;
