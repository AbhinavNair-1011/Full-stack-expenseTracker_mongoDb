async function fetchData(token) {
  return await axios.get(`http://localhost:3000/api/fetch-data`, {
    headers: { authorization: token },
  });
}
async function addData(details, token) {
  return await axios.post("http://localhost:3000/api/add-data", details, {
    headers: { authorization: token },
  });
}
async function deleteData(itemName, userEmail, token, itemPrice) {
  let lower = itemName.toLowerCase();
  return await axios.delete(
    `http://localhost:3000/api/delete-data/${userEmail}/${lower}`,
    { headers: { authorization: token }, data: { itemPrice } }
  );
}

async function updateData(updatedData, token) {
  return await axios.patch(
    `http://localhost:3000/api/update-data`,
    updatedData,
    { headers: { authorization: token } }
  );
}
async function createOrder(token) {
  return await axios.post(
    "http://localhost:3000/api/buy-membership/create-order",
    { headers: { authorization: token } }
  );
}
async function paymentDetails(details, token) {
  return await axios.post(
    "http://localhost:3000/api/buy-membership/payment",
    details,
    { headers: { authorization: token } }
  );
}
async function isPremiumMember(d, token) {
  return await axios.post(
    "http://localhost:3000/api/buy-membership/validate-membership",
    d,
    { headers: { authorization: token } }
  );
}
async function fetchLeaderBoard() {
  return await axios.get("http://localhost:3000/api/fetch-leaderboard");
}
async function expensesPagination(token, number, rows) {
  return await axios.get("http://localhost:3000/api/expenses-pagination", {
    headers: { authorization: token },
    params: { number: number, rowNumber: rows },
  });
}

document.addEventListener("DOMContentLoaded", (e) => {
  let expenseItems = document.querySelector("#expenseInput");
  let expensePrice = document.querySelector("#expensePrice");
  let submitBtn = document.querySelector("#submitBtn");
  let list = document.querySelector("#detailsList");
  let details = {};
  let allExpense = [];
  let rows;
  let rowsCheck = document.querySelector("#rows");

  if (localStorage.getItem("row")) {
    rows = Number(localStorage.getItem("row"));
    rowsCheck.value = rows;
  } else {
    rows = 10;
  }

  expenseItems.value = "";
  expensePrice.value = "";

  list.style.border = "1px solid white";
  submitBtn.style.backgroundColor = "grey";
  let hiddenElements;
  let pombajomba;
  let localStorageKey = [];
  let totalExpense = 0;

  let token = localStorage.getItem("token");

  let t = document.createElement("p");
  let span4 = document.createElement("span");
  span4.setAttribute("id", "totalSpan");
  t.setAttribute("class", "total");

  let tableBody = document.querySelector("#tableBody");

  fetchLeaderBoard()
    .then((result) => {
      for (let each of result.data.result) {
        let tr = document.createElement("tr");
        let td = document.createElement("td");
        let td2 = document.createElement("td");
        td.style.minWidth = "70px";
        td2.style.minWidth = "70px";

        td2.style.textAlign = "center";
        td.innerText = each.name;
        td2.innerText = each.totalAmount;

        tr.appendChild(td);
        tr.appendChild(td2);
        tableBody.appendChild(tr);
      }
    })
    .catch((err) => console.log(err));

  isPremiumMember("d", token)
    .then((res) => {
      if (!res.data.isPremiumMember) {
        let razorPay = document.querySelector("#razorPay");
        let leaderBoardDiv = document.querySelector("#premiumMember");
        razorPay.style.display = "unset";
        leaderBoardDiv.style.visibility = "hidden";
      } else {
        let leaderBoardDiv = document.querySelector("#premiumMember");
        let profile = document.querySelector(".profile");
        profile.style.justifyContent = "center";
        leaderBoardDiv.style.visibility = "visible";
      }
    })
    .catch((err) => console.log(err));

  /*--------------------------------------------------------------------*/
  /*--------------------------------------------------------------------*/

  /*--------------------------------------------------------------------*/

  /*--------------------------------------------------------------------*/

  expensesPagination(token, undefined, rows).then((res) => {
    let detailsSectionDiv = document.querySelector("#detailsSectionDiv");

    let data = res.data.paginatedExpenses;
    let totalPageCount = res.data.totalPageCount;
    let currentPageNumber = res.data.currentPageNumber;
    let div = document.createElement("div");
    div.setAttribute("id", "paginationDiv");

    for (let i = 1; i <= totalPageCount; i++) {
      if (i === currentPageNumber) {
        let button = document.createElement("button");
        button.setAttribute("id", "paginationButton");
        button.setAttribute("class", "paginationbtn selected");

        button.innerText = `${i}`;
        div.appendChild(button);
        continue;
      }
      let button = document.createElement("button");
      button.setAttribute("id", "paginationButton");
      button.setAttribute("class", "paginationbtn ");

      button.innerText = `${i}`;
      div.appendChild(button);
    }
    detailsSectionDiv.appendChild(div);

    data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    for (let each of data) {
      let x = each.expenseItem.toUpperCase();
      let y = each.expensePrice;

      let createdAt = new Date(each.createdAt);
      let date = createdAt.toLocaleDateString();

      let editBtn = document.createElement("button");
      let deleteBtn = document.createElement("button");

      editBtn.appendChild(document.createTextNode("EDIT"));
      deleteBtn.appendChild(document.createTextNode("DETELE"));
      editBtn.setAttribute("class", "edit");
      deleteBtn.setAttribute("class", "delete");
      editBtn.style.float = "right";
      deleteBtn.style.float = "right";

      let li = document.createElement("li");
      let span = document.createElement("span");
      let span2 = document.createElement("span");
      let dateSpan = document.createElement("span");

      li.appendChild(document.createTextNode("Expense :  "));
      span.appendChild(document.createTextNode(x));
      li.appendChild(span);
      li.appendChild(document.createTextNode("        Price :  "));
      span2.appendChild(document.createTextNode(y));
      li.appendChild(span2);
      li.appendChild(document.createTextNode("    Date :  "));
      dateSpan.appendChild(document.createTextNode(` ${date}`));
      li.appendChild(dateSpan);

      li.setAttribute("class", "value");

      li.style.fontWeight = "bold";
      li.style.fontSize = "21px";
      editBtn.style.fontSize = "14px";
      deleteBtn.style.fontSize = "14px";
      editBtn.style.backgroundColor = "yellow";
      deleteBtn.style.backgroundColor = "red";
      li.appendChild(deleteBtn);
      li.appendChild(editBtn);
      list.appendChild(li);
    }

    let logout = document.querySelector("#logout");
    logout.style.display = "initial";

    let userNameParagrah = document.querySelector("#userName");
    let userName = res.data.name;
    userNameParagrah.innerText = "Welcome " + userName;

    userNameParagrah.style.visibility = "visible";

    let paginationButtons = document.querySelectorAll(".paginationbtn");

    for (let each of paginationButtons) {
      each.addEventListener("click", (e) => {
        e.preventDefault();

        let pageNumber = e.target.innerText;
        let paginationButtons = document.querySelectorAll(".paginationbtn");

        for (let each2 of paginationButtons) {
          each2.classList.remove("selected");
        }
        e.target.classList.add("selected");
        expensesPagination(token, pageNumber, rows)
          .then((res) => {
            let data = res.data.paginatedExpenses;
            let ol = document.querySelector("#detailsList");

            ol.innerHTML = "";

            let totalPageCount = res.data.totalPageCount;

            data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            for (let each of data) {
              let x = each.expenseItem.toUpperCase();
              let y = each.expensePrice;

              let createdAt = new Date(each.createdAt);
              let date = createdAt.toLocaleDateString();

              let editBtn = document.createElement("button");
              let deleteBtn = document.createElement("button");

              editBtn.appendChild(document.createTextNode("EDIT"));
              deleteBtn.appendChild(document.createTextNode("DETELE"));
              editBtn.setAttribute("class", "edit");
              deleteBtn.setAttribute("class", "delete");
              editBtn.style.float = "right";
              deleteBtn.style.float = "right";

              let li = document.createElement("li");
              let span = document.createElement("span");
              let span2 = document.createElement("span");
              let dateSpan = document.createElement("span");

              li.appendChild(document.createTextNode("Expense :  "));
              span.appendChild(document.createTextNode(x));
              li.appendChild(span);
              li.appendChild(document.createTextNode("        Price :  "));
              span2.appendChild(document.createTextNode(y));
              li.appendChild(span2);
              li.appendChild(document.createTextNode("    Date :  "));
              dateSpan.appendChild(document.createTextNode(` ${date}`));
              li.appendChild(dateSpan);

              li.setAttribute("class", "value");

              li.style.fontWeight = "bold";
              li.style.fontSize = "21px";
              editBtn.style.fontSize = "14px";
              deleteBtn.style.fontSize = "14px";
              editBtn.style.backgroundColor = "yellow";
              deleteBtn.style.backgroundColor = "red";
              li.appendChild(deleteBtn);
              li.appendChild(editBtn);
              list.appendChild(li);
            }
            s.scrollIntoView({ behavior: "smooth", block: "start" });
            fetchData(token)
              .then((res) => {
                details.email = res.data.email;

                let data = res.data.data.result;

                data.sort(
                  (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );

                for (let each of data) {
                  let x = each.expenseItem.toUpperCase();
                  let y = each.expensePrice;

                  let createdAt = new Date(each.createdAt);
                  let date = createdAt.toLocaleDateString();

                  totalExpense += y;
                  let editBtn = document.createElement("button");
                  let deleteBtn = document.createElement("button");

                  editBtn.appendChild(document.createTextNode("EDIT"));
                  deleteBtn.appendChild(document.createTextNode("DETELE"));
                  editBtn.setAttribute("class", "edit");
                  deleteBtn.setAttribute("class", "delete");
                  editBtn.style.float = "right";
                  deleteBtn.style.float = "right";

                  let li = document.createElement("li");
                  li.style.display = "none";
                  let span = document.createElement("span");
                  let span2 = document.createElement("span");
                  let dateSpan = document.createElement("span");

                  li.appendChild(document.createTextNode("Expense Item :  "));
                  span.appendChild(document.createTextNode(x));
                  li.appendChild(span);
                  li.appendChild(document.createTextNode("        Price :  "));
                  span2.appendChild(document.createTextNode(y));
                  li.appendChild(span2);
                  li.appendChild(document.createTextNode("    Date :  "));
                  dateSpan.appendChild(document.createTextNode(` ${date}`));
                  li.appendChild(dateSpan);

                  li.setAttribute("class", "value");

                  li.style.fontWeight = "bold";
                  li.style.fontSize = "21px";
                  editBtn.style.fontSize = "14px";
                  deleteBtn.style.fontSize = "14px";
                  editBtn.style.backgroundColor = "yellow";
                  deleteBtn.style.backgroundColor = "red";
                  li.appendChild(deleteBtn);
                  li.appendChild(editBtn);
                  list.appendChild(li);
                }

                hiddenElements = document.querySelectorAll(
                  '.value[style*="display: none"]'
                );
              })
              .catch((err) => {});
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
  });

  fetchData(token)
    .then((res) => {
      details.email = res.data.email;

      let data = res.data.data.result;

      data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      for (let each of data) {
        let x = each.expenseItem.toUpperCase();
        let y = each.expensePrice;

        let createdAt = new Date(each.createdAt);
        let date = createdAt.toLocaleDateString();

        totalExpense += y;
        let editBtn = document.createElement("button");
        let deleteBtn = document.createElement("button");

        editBtn.appendChild(document.createTextNode("EDIT"));
        deleteBtn.appendChild(document.createTextNode("DETELE"));
        editBtn.setAttribute("class", "edit");
        deleteBtn.setAttribute("class", "delete");
        editBtn.style.float = "right";
        deleteBtn.style.float = "right";

        let li = document.createElement("li");
        li.style.display = "none";
        let span = document.createElement("span");
        let span2 = document.createElement("span");
        let dateSpan = document.createElement("span");

        li.appendChild(document.createTextNode("Expense Item :  "));
        span.appendChild(document.createTextNode(x));
        li.appendChild(span);
        li.appendChild(document.createTextNode("        Price :  "));
        span2.appendChild(document.createTextNode(y));
        li.appendChild(span2);
        li.appendChild(document.createTextNode("    Date :  "));
        dateSpan.appendChild(document.createTextNode(` ${date}`));
        li.appendChild(dateSpan);

        li.setAttribute("class", "value");

        li.style.fontWeight = "bold";
        li.style.fontSize = "21px";
        editBtn.style.fontSize = "14px";
        deleteBtn.style.fontSize = "14px";
        editBtn.style.backgroundColor = "yellow";
        deleteBtn.style.backgroundColor = "red";
        li.appendChild(deleteBtn);
        li.appendChild(editBtn);
        list.appendChild(li);
      }

      hiddenElements = document.querySelectorAll(
        '.value[style*="display: none"]'
      );

      span4.innerText = totalExpense;

      t.appendChild(document.createTextNode("Total Expense : "));
      t.appendChild(span4);
      inputForm.appendChild(t);
    })
    .catch((err) => {});

  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    var headingElement = document.getElementById("heading");

    let s = document.querySelector("#totalSpan");

    let eiValue = expenseItems.value.trim();
    let epValue = expensePrice.value.trim();

    let inputForm = document.querySelector("#inputForm");

    if (!eiValue || !epValue) {
      if (!eiValue) {
        if (
          expenseItems.parentElement.parentElement.nextElementSibling
            .className === "duplicateEntry"
        ) {
        } else {
          let p = document.createElement("p");
          p.setAttribute("class", "duplicateEntry");
          p.innerHTML = "*Item name required";
          inputForm.insertBefore(p, expensePrice.parentElement.parentElement);
        }
      }
      if (!epValue) {
        if (
          expensePrice.parentElement.parentElement.nextElementSibling
            .className === "duplicateEntry"
        ) {
        } else {
          let p = document.createElement("p");
          p.setAttribute("class", "duplicateEntry");
          p.innerHTML = "*Expense price required";
          inputForm.insertBefore(p, submitBtn.parentElement.parentElement);
        }
      }
    } else if (eiValue && epValue) {
      details.expenseItem = eiValue;
      details.expensePrice = epValue;

      if (
        expenseItems.parentElement.parentElement.nextElementSibling
          .className === "duplicateEntry"
      ) {
        inputForm.removeChild(
          expenseItems.parentElement.parentElement.nextElementSibling
        );
      }
      if (
        expensePrice.parentElement.parentElement.nextElementSibling
          .className === "duplicateEntry"
      ) {
        inputForm.removeChild(
          expensePrice.parentElement.parentElement.nextElementSibling
        );
      }

      addData(details, token)
        .then((res) => {
          totalExpense += +epValue;
          span4.innerText = totalExpense;
          expensesPagination(token, undefined, rows).then((res) => {
            let detailsSectionDiv =
              document.querySelector("#detailsSectionDiv");
            let pd = document.querySelector("#paginationDiv");
            pd.remove();
            let data = res.data.paginatedExpenses;
            let totalPageCount = res.data.totalPageCount;
            let currentPageNumber = res.data.currentPageNumber;
            let div = document.createElement("div");
            div.setAttribute("id", "paginationDiv");

            for (let i = 1; i <= totalPageCount; i++) {
              if (i === currentPageNumber) {
                let button = document.createElement("button");
                button.setAttribute("id", "paginationButton");
                button.setAttribute("class", "paginationbtn selected");

                button.innerText = `${i}`;
                div.appendChild(button);
                continue;
              }
              let button = document.createElement("button");
              button.setAttribute("id", "paginationButton");
              button.setAttribute("class", "paginationbtn ");

              button.innerText = `${i}`;
              div.appendChild(button);
            }
            detailsSectionDiv.appendChild(div);

            data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            list.innerText = "";
            for (let each of data) {
              let x = each.expenseItem.toUpperCase();
              let y = each.expensePrice;

              let createdAt = new Date(each.createdAt);
              let date = createdAt.toLocaleDateString();

              let editBtn = document.createElement("button");
              let deleteBtn = document.createElement("button");

              editBtn.appendChild(document.createTextNode("EDIT"));
              deleteBtn.appendChild(document.createTextNode("DETELE"));
              editBtn.setAttribute("class", "edit");
              deleteBtn.setAttribute("class", "delete");
              editBtn.style.float = "right";
              deleteBtn.style.float = "right";

              let li = document.createElement("li");
              let span = document.createElement("span");
              let span2 = document.createElement("span");
              let dateSpan = document.createElement("span");

              li.appendChild(document.createTextNode("Expense :  "));
              span.appendChild(document.createTextNode(x));
              li.appendChild(span);
              li.appendChild(document.createTextNode("        Price :  "));
              span2.appendChild(document.createTextNode(y));
              li.appendChild(span2);
              li.appendChild(document.createTextNode("    Date :  "));
              dateSpan.appendChild(document.createTextNode(` ${date}`));
              li.appendChild(dateSpan);

              li.setAttribute("class", "value");

              li.style.fontWeight = "bold";
              li.style.fontSize = "21px";
              editBtn.style.fontSize = "14px";
              deleteBtn.style.fontSize = "14px";
              editBtn.style.backgroundColor = "yellow";
              deleteBtn.style.backgroundColor = "red";
              li.appendChild(deleteBtn);
              li.appendChild(editBtn);
              list.appendChild(li);
            }

            let logout = document.querySelector("#logout");
            logout.style.display = "initial";

            let paginationButtons = document.querySelectorAll(".paginationbtn");

            for (let each of paginationButtons) {
              each.addEventListener("click", (e) => {
                e.preventDefault();

                let pageNumber = e.target.innerText;
                let paginationButtons =
                  document.querySelectorAll(".paginationbtn");

                for (let each2 of paginationButtons) {
                  each2.classList.remove("selected");
                }
                e.target.classList.add("selected");
                expensesPagination(token, pageNumber, rows)
                  .then((res) => {
                    let data = res.data.paginatedExpenses;
                    let ol = document.querySelector("#detailsList");

                    ol.innerHTML = "";

                    let totalPageCount = res.data.totalPageCount;

                    data.sort(
                      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                    );

                    for (let each of data) {
                      let x = each.expenseItem.toUpperCase();
                      let y = each.expensePrice;

                      let createdAt = new Date(each.createdAt);
                      let date = createdAt.toLocaleDateString();

                      let editBtn = document.createElement("button");
                      let deleteBtn = document.createElement("button");

                      editBtn.appendChild(document.createTextNode("EDIT"));
                      deleteBtn.appendChild(document.createTextNode("DETELE"));
                      editBtn.setAttribute("class", "edit");
                      deleteBtn.setAttribute("class", "delete");
                      editBtn.style.float = "right";
                      deleteBtn.style.float = "right";

                      let li = document.createElement("li");
                      let span = document.createElement("span");
                      let span2 = document.createElement("span");
                      let dateSpan = document.createElement("span");

                      li.appendChild(document.createTextNode("Expense :  "));
                      span.appendChild(document.createTextNode(x));
                      li.appendChild(span);
                      li.appendChild(
                        document.createTextNode("        Price :  ")
                      );
                      span2.appendChild(document.createTextNode(y));
                      li.appendChild(span2);
                      li.appendChild(document.createTextNode("    Date :  "));
                      dateSpan.appendChild(document.createTextNode(` ${date}`));
                      li.appendChild(dateSpan);

                      li.setAttribute("class", "value");

                      li.style.fontWeight = "bold";
                      li.style.fontSize = "21px";
                      editBtn.style.fontSize = "14px";
                      deleteBtn.style.fontSize = "14px";
                      editBtn.style.backgroundColor = "yellow";
                      deleteBtn.style.backgroundColor = "red";
                      li.appendChild(deleteBtn);
                      li.appendChild(editBtn);
                      list.appendChild(li);
                    }
                    s.scrollIntoView({ behavior: "smooth", block: "start" });
                    fetchData(token)
                      .then((res) => {
                        details.email = res.data.email;

                        let data = res.data.data.result;

                        data.sort(
                          (a, b) =>
                            new Date(b.createdAt) - new Date(a.createdAt)
                        );

                        for (let each of data) {
                          let x = each.expenseItem.toUpperCase();
                          let y = each.expensePrice;

                          let createdAt = new Date(each.createdAt);
                          let date = createdAt.toLocaleDateString();

                          // totalExpense += y;
                          let editBtn = document.createElement("button");
                          let deleteBtn = document.createElement("button");

                          editBtn.appendChild(document.createTextNode("EDIT"));
                          deleteBtn.appendChild(
                            document.createTextNode("DETELE")
                          );
                          editBtn.setAttribute("class", "edit");
                          deleteBtn.setAttribute("class", "delete");
                          editBtn.style.float = "right";
                          deleteBtn.style.float = "right";

                          let li = document.createElement("li");
                          li.style.display = "none";
                          let span = document.createElement("span");
                          let span2 = document.createElement("span");
                          let dateSpan = document.createElement("span");

                          li.appendChild(
                            document.createTextNode("Expense Item :  ")
                          );
                          span.appendChild(document.createTextNode(x));
                          li.appendChild(span);
                          li.appendChild(
                            document.createTextNode("        Price :  ")
                          );
                          span2.appendChild(document.createTextNode(y));
                          li.appendChild(span2);
                          li.appendChild(
                            document.createTextNode("    Date :  ")
                          );
                          dateSpan.appendChild(
                            document.createTextNode(` ${date}`)
                          );
                          li.appendChild(dateSpan);

                          li.setAttribute("class", "value");

                          li.style.fontWeight = "bold";
                          li.style.fontSize = "21px";
                          editBtn.style.fontSize = "14px";
                          deleteBtn.style.fontSize = "14px";
                          editBtn.style.backgroundColor = "yellow";
                          deleteBtn.style.backgroundColor = "red";
                          li.appendChild(deleteBtn);
                          li.appendChild(editBtn);
                          list.appendChild(li);
                        }

                        hiddenElements = document.querySelectorAll(
                          '.value[style*="display: none"]'
                        );
                      })
                      .catch((err) => {});
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              });
            }
          });
          fetchData(token)
                .then((res) => {
                  details.email = res.data.email;
  
                  let data = res.data.data.result;
  
                  data.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                  );
  
                  for (let each of data) {
                    let x = each.expenseItem.toUpperCase();
                    let y = each.expensePrice;
  
                    let createdAt = new Date(each.createdAt);
                    let date = createdAt.toLocaleDateString();
  
                    // totalExpense += y;
                    let editBtn = document.createElement("button");
                    let deleteBtn = document.createElement("button");
  
                    editBtn.appendChild(document.createTextNode("EDIT"));
                    deleteBtn.appendChild(document.createTextNode("DETELE"));
                    editBtn.setAttribute("class", "edit");
                    deleteBtn.setAttribute("class", "delete");
                    editBtn.style.float = "right";
                    deleteBtn.style.float = "right";
  
                    let li = document.createElement("li");
                    li.style.display = "none";
                    let span = document.createElement("span");
                    let span2 = document.createElement("span");
                    let dateSpan = document.createElement("span");
  
                    li.appendChild(document.createTextNode("Expense Item :  "));
                    span.appendChild(document.createTextNode(x));
                    li.appendChild(span);
                    li.appendChild(document.createTextNode("        Price :  "));
                    span2.appendChild(document.createTextNode(y));
                    li.appendChild(span2);
                    li.appendChild(document.createTextNode("    Date :  "));
                    dateSpan.appendChild(document.createTextNode(` ${date}`));
                    li.appendChild(dateSpan);
  
                    li.setAttribute("class", "value");
  
                    li.style.fontWeight = "bold";
                    li.style.fontSize = "21px";
                    editBtn.style.fontSize = "14px";
                    deleteBtn.style.fontSize = "14px";
                    editBtn.style.backgroundColor = "yellow";
                    deleteBtn.style.backgroundColor = "red";
                    li.appendChild(deleteBtn);
                    li.appendChild(editBtn);
                    list.appendChild(li);
                  }
  
                  hiddenElements = document.querySelectorAll(
                    '.value[style*="display: none"]'
                  );
                })
                .catch((err) => {});
        })
        .catch((err) => console.log(err));

      expenseItems.value = "";
      expensePrice.value = "";
    } else if (eiValue || epValue) {
      if (eiValue) {
        if (
          expenseItems.parentElement.parentElement.nextElementSibling
            .className === "duplicateEntry"
        ) {
          inputForm.removeChild(
            expenseItems.parentElement.parentElement.nextElementSibling
          );
        }
      }
      if (epValue) {
        if (
          expensePrice.parentElement.parentElement.nextElementSibling
            .className === "duplicateEntry"
        ) {
          inputForm.removeChild(
            expensePrice.parentElement.parentElement.nextElementSibling
          );
        }
      }
      expenseItems.value = "";
      expensePrice.value = "";
    }
  });

  let s = document.querySelector("#search");
  s.value = "";

  list.addEventListener("click", (e) => {
    e.preventDefault();

    if (e.target.classList.contains("delete")) {
      let ts = document.querySelector("#totalSpan");

      let deletedPrice = e.target.parentElement.childNodes[3].textContent;

      ts.innerText = Number(ts.textContent) - Number(deletedPrice);
      totalExpense = Number(ts.innerText);
      let ol = document.querySelector("#detailsList");

      let li = e.target.parentElement;
      let itemName = e.target.parentElement.children[0].textContent;
      let itemPrice = e.target.parentElement.children[1].textContent;

      let userEmail = details.email;

      deleteData(itemName, userEmail, token, itemPrice).then((res) => {
        expenseItems.value = "";
      expensePrice.value = "";
        s.scrollIntoView({ behavior: "smooth", block: "start" });
        if (
          expenseItems.parentElement.parentElement.nextElementSibling
            .className === "duplicateEntry"
        ) {
          inputForm.removeChild(
            expenseItems.parentElement.parentElement.nextElementSibling
          );
        }

        if (
          expensePrice.parentElement.parentElement.nextElementSibling
            .className === "duplicateEntry"
        ) {
          inputForm.removeChild(
            expensePrice.parentElement.parentElement.nextElementSibling
          );
        }

        expensesPagination(token, undefined, rows).then((res) => {
          let detailsSectionDiv = document.querySelector("#detailsSectionDiv");
          let pd = document.querySelector("#paginationDiv");
          pd.remove();
          let data = res.data.paginatedExpenses;
          let totalPageCount = res.data.totalPageCount;
          let currentPageNumber = res.data.currentPageNumber;
          let div = document.createElement("div");
          div.setAttribute("id", "paginationDiv");

          for (let i = 1; i <= totalPageCount; i++) {
            if (i === currentPageNumber) {
              let button = document.createElement("button");
              button.setAttribute("id", "paginationButton");
              button.setAttribute("class", "paginationbtn selected");

              button.innerText = `${i}`;
              div.appendChild(button);
              continue;
            }
            let button = document.createElement("button");
            button.setAttribute("id", "paginationButton");
            button.setAttribute("class", "paginationbtn ");

            button.innerText = `${i}`;
            div.appendChild(button);
          }
          detailsSectionDiv.appendChild(div);

          data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          list.innerText = "";
          for (let each of data) {
            let x = each.expenseItem.toUpperCase();
            let y = each.expensePrice;

            let createdAt = new Date(each.createdAt);
            let date = createdAt.toLocaleDateString();

            let editBtn = document.createElement("button");
            let deleteBtn = document.createElement("button");

            editBtn.appendChild(document.createTextNode("EDIT"));
            deleteBtn.appendChild(document.createTextNode("DETELE"));
            editBtn.setAttribute("class", "edit");
            deleteBtn.setAttribute("class", "delete");
            editBtn.style.float = "right";
            deleteBtn.style.float = "right";

            let li = document.createElement("li");
            let span = document.createElement("span");
            let span2 = document.createElement("span");
            let dateSpan = document.createElement("span");

            li.appendChild(document.createTextNode("Expense :  "));
            span.appendChild(document.createTextNode(x));
            li.appendChild(span);
            li.appendChild(document.createTextNode("        Price :  "));
            span2.appendChild(document.createTextNode(y));
            li.appendChild(span2);
            li.appendChild(document.createTextNode("    Date :  "));
            dateSpan.appendChild(document.createTextNode(` ${date}`));
            li.appendChild(dateSpan);

            li.setAttribute("class", "value");

            li.style.fontWeight = "bold";
            li.style.fontSize = "21px";
            editBtn.style.fontSize = "14px";
            deleteBtn.style.fontSize = "14px";
            editBtn.style.backgroundColor = "yellow";
            deleteBtn.style.backgroundColor = "red";
            li.appendChild(deleteBtn);
            li.appendChild(editBtn);
            list.appendChild(li);
          }

          let logout = document.querySelector("#logout");
          logout.style.display = "initial";

          let paginationButtons = document.querySelectorAll(".paginationbtn");

          for (let each of paginationButtons) {
            each.addEventListener("click", (e) => {
              e.preventDefault();

              let pageNumber = e.target.innerText;
              let paginationButtons =
                document.querySelectorAll(".paginationbtn");

              for (let each2 of paginationButtons) {
                each2.classList.remove("selected");
              }
              e.target.classList.add("selected");
              expensesPagination(token, pageNumber, rows)
                .then((res) => {
                  let data = res.data.paginatedExpenses;
                  let ol = document.querySelector("#detailsList");

                  ol.innerHTML = "";

                  let totalPageCount = res.data.totalPageCount;

                  data.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                  );

                  for (let each of data) {
                    let x = each.expenseItem.toUpperCase();
                    let y = each.expensePrice;

                    let createdAt = new Date(each.createdAt);
                    let date = createdAt.toLocaleDateString();

                    let editBtn = document.createElement("button");
                    let deleteBtn = document.createElement("button");

                    editBtn.appendChild(document.createTextNode("EDIT"));
                    deleteBtn.appendChild(document.createTextNode("DETELE"));
                    editBtn.setAttribute("class", "edit");
                    deleteBtn.setAttribute("class", "delete");
                    editBtn.style.float = "right";
                    deleteBtn.style.float = "right";

                    let li = document.createElement("li");
                    let span = document.createElement("span");
                    let span2 = document.createElement("span");
                    let dateSpan = document.createElement("span");

                    li.appendChild(document.createTextNode("Expense :  "));
                    span.appendChild(document.createTextNode(x));
                    li.appendChild(span);
                    li.appendChild(
                      document.createTextNode("        Price :  ")
                    );
                    span2.appendChild(document.createTextNode(y));
                    li.appendChild(span2);
                    li.appendChild(document.createTextNode("    Date :  "));
                    dateSpan.appendChild(document.createTextNode(` ${date}`));
                    li.appendChild(dateSpan);

                    li.setAttribute("class", "value");

                    li.style.fontWeight = "bold";
                    li.style.fontSize = "21px";
                    editBtn.style.fontSize = "14px";
                    deleteBtn.style.fontSize = "14px";
                    editBtn.style.backgroundColor = "yellow";
                    deleteBtn.style.backgroundColor = "red";
                    li.appendChild(deleteBtn);
                    li.appendChild(editBtn);
                    list.appendChild(li);
                  }
                  s.scrollIntoView({ behavior: "smooth", block: "start" });
                  fetchData(token)
                    .then((res) => {
                      details.email = res.data.email;

                      let data = res.data.data.result;

                      data.sort(
                        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                      );

                      for (let each of data) {
                        let x = each.expenseItem.toUpperCase();
                        let y = each.expensePrice;

                        let createdAt = new Date(each.createdAt);
                        let date = createdAt.toLocaleDateString();

                        totalExpense += y;
                        let editBtn = document.createElement("button");
                        let deleteBtn = document.createElement("button");

                        editBtn.appendChild(document.createTextNode("EDIT"));
                        deleteBtn.appendChild(
                          document.createTextNode("DETELE")
                        );
                        editBtn.setAttribute("class", "edit");
                        deleteBtn.setAttribute("class", "delete");
                        editBtn.style.float = "right";
                        deleteBtn.style.float = "right";

                        let li = document.createElement("li");
                        li.style.display = "none";
                        let span = document.createElement("span");
                        let span2 = document.createElement("span");
                        let dateSpan = document.createElement("span");

                        li.appendChild(
                          document.createTextNode("Expense Item :  ")
                        );
                        span.appendChild(document.createTextNode(x));
                        li.appendChild(span);
                        li.appendChild(
                          document.createTextNode("        Price :  ")
                        );
                        span2.appendChild(document.createTextNode(y));
                        li.appendChild(span2);
                        li.appendChild(document.createTextNode("    Date :  "));
                        dateSpan.appendChild(
                          document.createTextNode(` ${date}`)
                        );
                        li.appendChild(dateSpan);

                        li.setAttribute("class", "value");

                        li.style.fontWeight = "bold";
                        li.style.fontSize = "21px";
                        editBtn.style.fontSize = "14px";
                        deleteBtn.style.fontSize = "14px";
                        editBtn.style.backgroundColor = "yellow";
                        deleteBtn.style.backgroundColor = "red";
                        li.appendChild(deleteBtn);
                        li.appendChild(editBtn);
                        list.appendChild(li);
                      }

                      hiddenElements = document.querySelectorAll(
                        '.value[style*="display: none"]'
                      );
                    })
                    .catch((err) => {});
                })
                .catch((err) => {
                  console.log(err);
                });
            });
          }
        });
        fetchData(token)
          .then((res) => {
            details.email = res.data.email;

            let data = res.data.data.result;

            data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            for (let each of data) {
              let x = each.expenseItem.toUpperCase();
              let y = each.expensePrice;

              let createdAt = new Date(each.createdAt);
              let date = createdAt.toLocaleDateString();

              totalExpense += y;
              let editBtn = document.createElement("button");
              let deleteBtn = document.createElement("button");

              editBtn.appendChild(document.createTextNode("EDIT"));
              deleteBtn.appendChild(document.createTextNode("DETELE"));
              editBtn.setAttribute("class", "edit");
              deleteBtn.setAttribute("class", "delete");
              editBtn.style.float = "right";
              deleteBtn.style.float = "right";

              let li = document.createElement("li");
              li.style.display = "none";
              let span = document.createElement("span");
              let span2 = document.createElement("span");
              let dateSpan = document.createElement("span");

              li.appendChild(document.createTextNode("Expense Item :  "));
              span.appendChild(document.createTextNode(x));
              li.appendChild(span);
              li.appendChild(document.createTextNode("        Price :  "));
              span2.appendChild(document.createTextNode(y));
              li.appendChild(span2);
              li.appendChild(document.createTextNode("    Date :  "));
              dateSpan.appendChild(document.createTextNode(` ${date}`));
              li.appendChild(dateSpan);

              li.setAttribute("class", "value");

              li.style.fontWeight = "bold";
              li.style.fontSize = "21px";
              editBtn.style.fontSize = "14px";
              deleteBtn.style.fontSize = "14px";
              editBtn.style.backgroundColor = "yellow";
              deleteBtn.style.backgroundColor = "red";
              li.appendChild(deleteBtn);
              li.appendChild(editBtn);
              list.appendChild(li);
            }

            hiddenElements = document.querySelectorAll(
              '.value[style*="display: none"]'
            );
          })
          .catch((err) => {});
      });

      let indexofItem = localStorageKey.indexOf(itemName);
      ol.removeChild(li);
      localStorageKey.splice(indexofItem, 1);
    } else if (e.target.classList.contains("edit")) {
      document.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
          event.preventDefault();
        }
      });
      let newdiv = document.createElement("div");
      let updatedData = {};
      updatedData.email = details;
      let updateDataTracker = false;

      pombajomba = e.target.parentElement.childNodes[3].textContent;

      let btn = document.createElement("button");
      let btn2 = document.createElement("button");

      if (submitBtn.style.display != "none") {
        submitBtn.style.display = "none";

        newdiv.setAttribute("class", "row close");

        btn2.appendChild(document.createTextNode("Edit"));

        btn.appendChild(document.createTextNode("Cancel"));
        btn.setAttribute("class", "col-4");
        btn2.setAttribute("class", "col");
        btn.style.backgroundColor = "red";
        btn2.style.backgroundColor = "green";
        btn.style.color = "white";
        btn2.style.color = "white";

        newdiv.appendChild(btn2);
        newdiv.appendChild(btn);
        document.querySelector("#inputForm").appendChild(newdiv);

        document.getElementById("expenseInput").value =
          e.target.parentElement.childNodes[1].innerText;

        document.getElementById("expensePrice").value =
          e.target.parentElement.childNodes[3].innerText;
      }

      let x = e.target.parentElement;

      let upperE = e.target.parentElement;

      btn2.addEventListener("click", (e) => {
        e.preventDefault();
        let sameValue = false;
        let oldKey = upperE.childNodes[1].innerText;
        let oldPrice = upperE.childNodes[3].innerText;

        let flag = false;

        if (
          document.getElementById("expenseInput").value !=
            upperE.childNodes[1].innerText &&
          document.getElementById("expenseInput").value != "" &&
          document.getElementById("expensePrice").value ==
            upperE.childNodes[3].innerText
        ) {
          if (!flag) {
            upperE.childNodes[1].innerText = document
              .getElementById("expenseInput")
              .value.toUpperCase();
          }
          updateDataTracker = true;
          updatedData.todo = "onlyItemName";
          updatedData.newExpenseItem =
            document.getElementById("expenseInput").value;
          updatedData.currentPrice = oldPrice;
          updatedData.currentExpenseItem = oldKey;
        } else if (
          document.getElementById("expensePrice").value !=
            upperE.childNodes[3].innerText &&
          document.getElementById("expensePrice").value != "" &&
          document.getElementById("expenseInput").value ==
            upperE.childNodes[1].innerText
        ) {
          if (document.getElementById("expensePrice").value == 0) {
          } else {
            upperE.childNodes[3].innerText =
              document.getElementById("expensePrice").value;

            updateDataTracker = true;
            updatedData.todo = "onlyItemPrice";
            updatedData.currentPrice = oldPrice;

            updatedData.currentExpenseItem = oldKey;
            updatedData.newExpensePrice =
              document.getElementById("expensePrice").value;
          }
        } else if (
          document.getElementById("expensePrice").value !=
            upperE.childNodes[3].innerText &&
          document.getElementById("expenseInput").value !=
            upperE.childNodes[1].innerText &&
          document.getElementById("expensePrice").value != "" &&
          document.getElementById("expenseInput").value != ""
        ) {
          flag = false;

          if (!flag) {
            upperE.childNodes[1].innerText = document
              .getElementById("expenseInput")
              .value.toUpperCase();
            upperE.childNodes[3].innerText =
              document.getElementById("expensePrice").value;

            updateDataTracker = true;
            updatedData.todo = "itemName&itemPrice";
            updatedData.currentPrice = oldPrice;

            updatedData.currentExpenseItem = oldKey;
            updatedData.newExpenseItem =
              document.getElementById("expenseInput").value;
            updatedData.newExpensePrice =
              document.getElementById("expensePrice").value;
          }
        } else if (
          document.getElementById("expensePrice").value ==
            upperE.childNodes[3].innerText &&
          document.getElementById("expenseInput").value ==
            upperE.childNodes[1].innerText
        ) {
          let x = confirm("Same price, do u want to change the price?");
          if (x === true) {
            sameValue = true;
          }
        } else {
          alert("Empty values not allowed");
        }

        if (
          document.getElementById("expensePrice").value != pombajomba &&
          document.getElementById("expensePrice").value != "" &&
          document.getElementById("expenseInput").value != ""
        ) {
          if (document.getElementById("expensePrice").value == 0) {
            alert("invalid amount - 0");
          } else if (!flag) {
            let ts1 = document.querySelector("#totalSpan");

            let result = 0;
            result = Number(ts1.textContent) - Number(pombajomba);
            totalExpense =
              result + Number(document.getElementById("expensePrice").value);
            ts1.innerText = totalExpense;
          }
        }
        if (!sameValue) {
          expenseItems.value = "";
          expensePrice.value = "";
          inputForm.removeChild(newdiv);
          x.style.backgroundColor = "rgba(4, 221, 241, 0.625)";
          submitBtn.style.display = "unset";
        } else {
          expensePrice.value = "";
        }
        if (updateDataTracker === true) {
          updateData(updatedData, token)
            .then((result) => console.log(result))
            .catch((err) => console.log(err));
        }
      });

      btn.addEventListener("click", (e) => {
        e.preventDefault();
        expenseItems.value = "";
        expensePrice.value = "";
        inputForm.removeChild(newdiv);
        submitBtn.style.display = "unset";
      });
    }
  });

  function filter(e) {
    let x = e.target.value.toLowerCase() || "";
    if (x == "") {
      let paginationButton = document.querySelectorAll("#paginationButton");

      for (let each of paginationButton) {
        if (each.textContent === "1") {
          e.target.blur();
          break;
        }
      }
    }
    s.scrollIntoView({ behavior: "smooth", block: "start" });

    for (let each of hiddenElements) {
      let result = each.children[0].innerText.toLowerCase();

      let x = e.target.value.toLowerCase() || "";

      if (result[0] === x[0]) {
        if (result.indexOf(x) != -1) {
          each.style.display = "block";
        } else {
          each.style.display = "none";
        }
      }
    }
  }
  search.addEventListener("click", () => {
    const visibleElements = document.querySelectorAll(
      '.value:not([style*="display: none"])'
    );
    for (let each of visibleElements) {
      each.remove();
    }
  });
  search.addEventListener("keyup", filter);

  let razorPayBtn = document.querySelector("#razorPay");
  razorPayBtn.addEventListener("click", (e) => {
    e.preventDefault();

    createOrder(token)
      .then((res) => {
        let rzp1 = new Razorpay({
          key_id: res.data.key_id,
          order_id: res.data.order_id,
          handler: (responce) => {
            paymentDetails(responce, token)
              .then((res) => {
                let premiumBtn = document.querySelector("#razorPay");
                let leaderBoardDiv = document.querySelector("#premiumMember");
                let profile = document.querySelector(".profile");
                profile.style.justifyContent = "center";
                premiumBtn.style.display = "none";
                leaderBoardDiv.style.visibility = "visible";
              })
              .catch((err) => console.log(err));
          },
        });

        rzp1.open();
      })

      .catch((err) => {
        console.log(err);
      });
  });

  let leaderboardBtn = document.querySelector("#leaderBoard");
  let leaderBoardCloseBtn = document.querySelector("#closeLeaderboard");
  let leaderBoardDiv = document.querySelector("#leaderBoardDiv");

  leaderboardBtn.addEventListener("click", (e) => {
    leaderBoardDiv.style.display = "initial";
    search.style.zIndex = "0";
  });

  leaderBoardCloseBtn.addEventListener("click", (e) => {
    search.style.zIndex = "6";
    leaderBoardDiv.style.display = "none";
  });

  let p = document.createElement("p");
  p.innerHTML = "LEADERBOARD";
  p.style.color = "white";
  p.style.fontSize = "30px";
  p.style.textAlign = "center";
  p.style.fontWeight = "bold";
  p.style.paddingLeft = "36px";
  p.setAttribute("id", "headingLeaderboard");

  leaderBoardDiv.insertBefore(p, leaderBoardCloseBtn.nextElementSibling);
  let logout = document.querySelector("#logout");

  logout.addEventListener("click", (e) => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("loggedin");
    window.location.href = "../../views/index.html";
  });
  let expenseReport = document.querySelector("#expenseReport");
  expenseReport.addEventListener("click", (e) => {
    window.location.href = "../../views/expenseReport.html";
  });

  s.addEventListener("blur", () => {
    let paginationButtons = document.querySelectorAll("#paginationButton");
    for (let each of paginationButtons) {
      if (each.textContent == 1) {
        s.value = "";
        each.click();
      }
    }
  });

  let rows2 = document.querySelector("#rows");
  rows2.addEventListener("change", (e) => {
    rows = rows2.value;
    localStorage.setItem("row", rows);

    expensesPagination(token, undefined, rows).then((res) => {
      let detailsSectionDiv = document.querySelector("#detailsSectionDiv");

      let data = res.data.paginatedExpenses;
      let totalPageCount = res.data.totalPageCount;
      let currentPageNumber = res.data.currentPageNumber;

      let deletePaginationDiv = document.querySelector("#paginationDiv");
      deletePaginationDiv.remove();
      let div = document.createElement("div");
      div.setAttribute("id", "paginationDiv");

      for (let i = 1; i <= totalPageCount; i++) {
        if (i === currentPageNumber) {
          let button = document.createElement("button");
          button.setAttribute("id", "paginationButton");
          button.setAttribute("class", "paginationbtn selected");

          button.innerText = `${i}`;
          div.appendChild(button);
          continue;
        }
        let button = document.createElement("button");
        button.setAttribute("id", "paginationButton");
        button.setAttribute("class", "paginationbtn ");

        button.innerText = `${i}`;
        div.appendChild(button);
      }
      detailsSectionDiv.appendChild(div);

      data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      list.innerHTML = "";
      for (let each of data) {
        let x = each.expenseItem.toUpperCase();
        let y = each.expensePrice;

        let createdAt = new Date(each.createdAt);
        let date = createdAt.toLocaleDateString();

        let editBtn = document.createElement("button");
        let deleteBtn = document.createElement("button");

        editBtn.appendChild(document.createTextNode("EDIT"));
        deleteBtn.appendChild(document.createTextNode("DETELE"));
        editBtn.setAttribute("class", "edit");
        deleteBtn.setAttribute("class", "delete");
        editBtn.style.float = "right";
        deleteBtn.style.float = "right";

        let li = document.createElement("li");
        let span = document.createElement("span");
        let span2 = document.createElement("span");
        let dateSpan = document.createElement("span");

        li.appendChild(document.createTextNode("Expense :  "));
        span.appendChild(document.createTextNode(x));
        li.appendChild(span);
        li.appendChild(document.createTextNode("        Price :  "));
        span2.appendChild(document.createTextNode(y));
        li.appendChild(span2);
        li.appendChild(document.createTextNode("    Date :  "));
        dateSpan.appendChild(document.createTextNode(` ${date}`));
        li.appendChild(dateSpan);

        li.setAttribute("class", "value");

        li.style.fontWeight = "bold";
        li.style.fontSize = "21px";
        editBtn.style.fontSize = "14px";
        deleteBtn.style.fontSize = "14px";
        editBtn.style.backgroundColor = "yellow";
        deleteBtn.style.backgroundColor = "red";
        li.appendChild(deleteBtn);
        li.appendChild(editBtn);

        list.appendChild(li);
      }

      let logout = document.querySelector("#logout");
      logout.style.display = "initial";

      let paginationButtons = document.querySelectorAll(".paginationbtn");

      for (let each of paginationButtons) {
        each.addEventListener("click", (e) => {
          e.preventDefault();

          let pageNumber = e.target.innerText;
          let paginationButtons = document.querySelectorAll(".paginationbtn");

          for (let each2 of paginationButtons) {
            each2.classList.remove("selected");
          }
          e.target.classList.add("selected");
          expensesPagination(token, pageNumber, rows)
            .then((res) => {
              let data = res.data.paginatedExpenses;
              let ol = document.querySelector("#detailsList");

              ol.innerHTML = "";

              let totalPageCount = res.data.totalPageCount;

              data.sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
              );

              for (let each of data) {
                let x = each.expenseItem.toUpperCase();
                let y = each.expensePrice;

                let createdAt = new Date(each.createdAt);
                let date = createdAt.toLocaleDateString();

                let editBtn = document.createElement("button");
                let deleteBtn = document.createElement("button");

                editBtn.appendChild(document.createTextNode("EDIT"));
                deleteBtn.appendChild(document.createTextNode("DETELE"));
                editBtn.setAttribute("class", "edit");
                deleteBtn.setAttribute("class", "delete");
                editBtn.style.float = "right";
                deleteBtn.style.float = "right";

                let li = document.createElement("li");
                let span = document.createElement("span");
                let span2 = document.createElement("span");
                let dateSpan = document.createElement("span");

                li.appendChild(document.createTextNode("Expense :  "));
                span.appendChild(document.createTextNode(x));
                li.appendChild(span);
                li.appendChild(document.createTextNode("        Price :  "));
                span2.appendChild(document.createTextNode(y));
                li.appendChild(span2);
                li.appendChild(document.createTextNode("    Date :  "));
                dateSpan.appendChild(document.createTextNode(` ${date}`));
                li.appendChild(dateSpan);

                li.setAttribute("class", "value");

                li.style.fontWeight = "bold";
                li.style.fontSize = "21px";
                editBtn.style.fontSize = "14px";
                deleteBtn.style.fontSize = "14px";
                editBtn.style.backgroundColor = "yellow";
                deleteBtn.style.backgroundColor = "red";
                li.appendChild(deleteBtn);
                li.appendChild(editBtn);
                list.appendChild(li);
              }
              s.scrollIntoView({ behavior: "smooth", block: "start" });
              fetchData(token)
                .then((res) => {
                  details.email = res.data.email;

                  let data = res.data.data.result;

                  data.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                  );

                  for (let each of data) {
                    let x = each.expenseItem.toUpperCase();
                    let y = each.expensePrice;

                    let createdAt = new Date(each.createdAt);
                    let date = createdAt.toLocaleDateString();

                    totalExpense += y;
                    let editBtn = document.createElement("button");
                    let deleteBtn = document.createElement("button");

                    editBtn.appendChild(document.createTextNode("EDIT"));
                    deleteBtn.appendChild(document.createTextNode("DETELE"));
                    editBtn.setAttribute("class", "edit");
                    deleteBtn.setAttribute("class", "delete");
                    editBtn.style.float = "right";
                    deleteBtn.style.float = "right";

                    let li = document.createElement("li");
                    li.style.display = "none";
                    let span = document.createElement("span");
                    let span2 = document.createElement("span");
                    let dateSpan = document.createElement("span");

                    li.appendChild(document.createTextNode("Expense Item :  "));
                    span.appendChild(document.createTextNode(x));
                    li.appendChild(span);
                    li.appendChild(
                      document.createTextNode("        Price :  ")
                    );
                    span2.appendChild(document.createTextNode(y));
                    li.appendChild(span2);
                    li.appendChild(document.createTextNode("    Date :  "));
                    dateSpan.appendChild(document.createTextNode(` ${date}`));
                    li.appendChild(dateSpan);

                    li.setAttribute("class", "value");

                    li.style.fontWeight = "bold";
                    li.style.fontSize = "21px";
                    editBtn.style.fontSize = "14px";
                    deleteBtn.style.fontSize = "14px";
                    editBtn.style.backgroundColor = "yellow";
                    deleteBtn.style.backgroundColor = "red";
                    li.appendChild(deleteBtn);
                    li.appendChild(editBtn);
                    list.appendChild(li);
                  }

                  hiddenElements = document.querySelectorAll(
                    '.value[style*="display: none"]'
                  );
                })
                .catch((err) => {});
            })
            .catch((err) => {
              console.log(err);
            });
        });
      }
    });
  });
});
