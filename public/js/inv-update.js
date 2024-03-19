const form = document.getElementById("updateForm")
    form.addEventListener("change", function () {
      const updateBtn = document.querySelector("button")
      updateBtn.removeAttribute("disabled")
    })

    const historyBack = document.getElementById("historyBack")
    historyBack.addEventListener("click", function () {
      history.back()
    })