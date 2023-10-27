async function fetchData(token) {
  return await axios.get(`http://localhost:3000/api/fetch-data`, {
    headers: { authorization: token },
  });
}
async function downloadExpenses(token) {
  return await axios.get(`http://localhost:3000/api/download-expenses`, {
    headers: { authorization: token },
  });
}


window.addEventListener("DOMContentLoaded", (e) => {
  let monthName = document.querySelector("#monthName");
  let selectMonth = document.querySelector("#selectMonth");
  let noExpensesRow = document.querySelector("#noExpensesRow");
  let monthlyTableBody = document.querySelector("#monthlyTableBody");
  let totalExpense = 0;
  let token = localStorage.getItem("token");
  let monthlyDetails = [];

  if(!sessionStorage.getItem("loggedin")){
    window.location.href="../../views/index.html";
  }
  

  fetchData(token)
    .then((res) => {
      for (let each of res.data.data.result) {
        let x = each.expenseItem.toUpperCase();
        let y = each.expensePrice;

        let createdAt = new Date(each.createdAt);
        let date = createdAt.toLocaleDateString();
        let monthNames = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];

        let month = monthNames[createdAt.getMonth()];
        totalExpense += y;
        
        monthlyDetails.push({ month: month, item: x, price: y, date:date,desc:createdAt });
        
        monthlyDetails.sort((a,b)=> {return b.desc-a.desc})
      }

let yearlyExpense={
    january:0,february:0,march:0,april:0,may:0,june:0,july:0,august:0,september:0,october:0,november:0,december:0
}


monthlyDetails.map((each)=>{
switch(each.month){
    case "Jaunuary":{
        yearlyExpense.january+=each.price;
        
        break;
    }
    case "February":{
        yearlyExpense.february+=each.price;
        break;
    }
    case "March":{
        yearlyExpense.march+=each.price;
        break;
    }
    case "April":{
        yearlyExpense.april+=each.price;
        break;
    }
    case "May":{
        yearlyExpense.may+=each.price;
        break;
    }
    case "June":{
        yearlyExpense.june+=each.price;
      
        break;
    }
    case "July":{
        yearlyExpense.july+=each.price;
        break;
    }
    case "August":{
        yearlyExpense.august+=each.price;
        break;
    }
    case "September":{
        yearlyExpense.september+=each.price;
        break;
    }
    case "October":{
        yearlyExpense.october+=each.price;
        break;
    }
    case "November":{
        yearlyExpense.november+=each.price;
        break;
    }
    case "December":{
        yearlyExpense.december+=each.price;
        break;
    }
       

}
})

document.querySelector("#totalAmount").innerText=totalExpense
document.querySelector("#januaryAmount").innerText=yearlyExpense.january;
document.querySelector("#februaryAmount").innerText=yearlyExpense.february;
document.querySelector("#marchAmount").innerText=yearlyExpense.march;
document.querySelector("#aprilAmount").innerText=yearlyExpense.april
document.querySelector("#mayAmount").innerText=yearlyExpense.may
document.querySelector("#juneAmount").innerText=yearlyExpense.june
document.querySelector("#julyAmount").innerText=yearlyExpense.july
document.querySelector("#augustAmount").innerText=yearlyExpense.august
document.querySelector("#septemberAmount").innerText=yearlyExpense.september
document.querySelector("#octoberAmount").innerText=yearlyExpense.october
document.querySelector("#novemberAmount").innerText=yearlyExpense.november
document.querySelector("#decemberAmount").innerText=yearlyExpense.december
 
      selectMonth.addEventListener("change", (e) => {
        monthName.innerText = selectMonth.value.toUpperCase();
        let monthlyTableBody = document.querySelector("#monthlyTableBody");
        monthlyTableBody.textContent="";
        let newNoExpenseRow = document.querySelector("#newNoExpenseRow");
        let flag=false;

        for (let each of monthlyDetails) {
          let tr = document.createElement("tr");
          let td = document.createElement("td");
          let td2 = document.createElement("td");
          let td3 = document.createElement("td");

          if (each.month === selectMonth.value) {
          flag=true;
            let date = each.date;
            let item = each.item;
            let price = each.price;
            td.innerText = date;
            td2.innerText = item;
            td3.innerText = price;
            tr.appendChild(td);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.setAttribute("class", "selectedMonth");
            
            monthlyTableBody.appendChild(tr);
          }
        
        }
        if(!flag){
            let tr = document.createElement("tr");
            let td = document.createElement("td");
            let td2 = document.createElement("td");
            let td3 = document.createElement("td");
            td.innerText = "---"
            td2.innerText = `*No expenses in ${selectMonth.value}*`
            td3.innerText ="-----"
            tr.appendChild(td);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.setAttribute("class", "selectedMonth");
            tr.style.color="red"

            monthlyTableBody.appendChild(tr);
        }
      });
    })
    .catch((err) => {});
    
    let logout=document.querySelector("#logout");

    logout.addEventListener("click",(e)=>{
      localStorage.removeItem("token")   ; 
      sessionStorage.removeItem("loggedin")
      window.location.href="../../views/index.html";
  
    })
    let mainPage=document.querySelector("#mainPage");

  mainPage.addEventListener("click",(e)=>{
    window.location.href="../../views/mainPage.html";
                             
  })

  // let downloadBtn=document.querySelector(".circle");

  //   downloadBtn.addEventListener("click",(e)=>{
  //     e.preventDefault()
  //   downloadExpenses(token).then((res)=>{
  //     let a=document.createElement("a");

  //     a.href=res.data.data.Location;
  //     a.download="expense.txt"
  //     a.click();
  //   })
  //   .catch(err=>{
  //     console.log(err)
  //   })

  // })
  
    
});
