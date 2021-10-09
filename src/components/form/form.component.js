export const addNoteComponent = {
    newForm: undefined,
    noteInput:undefined,
    slider:undefined,
    sliderItems:[{name:"Bath",icon:"bath"},
    {name:"Cocktail",icon:"cocktail", checked:"checked"},
    {name:"Bed",icon:"bed"},
    {name:"Train",icon:"dumbbell"},
    {name:"Work",icon:"shopping-bag"}],
    inited: false,

    inited: function () {
        if (this.init) {
            return false;
        } else {
            this.newForm = document.querySelector("[data-dom=search-form]");
            this.noteInput = document.querySelector("[data-dom=note-input]");
            this.slider = document.querySelector("[data-dom=slider]");
            this.addSliderItems();
            this.applyEventHandlers();
            this.init = true;
        }
    },

    createNewNote: function(newTask) {
    let newTaskLabel = document.createElement("label");
    let taskSlider = document.querySelector("[data-dom=task-place]");

    let task =`
        <span class="icon icon_note">
            <i class="fas fa-${newTask.icon}"></i>
        </span>
        <div class="note__content">
            <p class="note__name">${newTask.name}</p>
            <p class="note__discription">${newTask.about || " "}</p>
        </div>

            <input type="checkbox" class="note__checkbox">
            <span class="icon icon_note"><i class="fas fa-check-circle"></i></span>`;

    newTaskLabel.classList.add("note");
    newTaskLabel.innerHTML = task;
    taskSlider.append(newTaskLabel);
    },

    populateNotesFromArray: function (data) {
        const taskSlider = document.querySelector("[data-dom=task-place]");
        const fragment = document.createDocumentFragment();

        // renderToDom(data, 'some tempalte')

        //let i = data.length;
        let element;

        for(let i=0; i<data.length; i++){
          element = document.createElement("label");
          element.className = "note";
          const task = `
          <span class="icon icon_note">
              <i class="fas fa-${data[i].icon}"></i>
          </span>
          <div class="note__content">
              <p class="note__name">${data[i].name}</p>
              <p class="note__discription">${data[i].about || ""}</p>
          </div>

              <input type="checkbox" class="note__checkbox">
              <span class="icon icon_note"><i class="fas fa-check-circle"></i></span>`;
          element.innerHTML = task;
          fragment.appendChild(element);
        }
        taskSlider.appendChild(fragment);
      },

    applyEventHandlers: function() {
        this.newForm.addEventListener("submit", this.onNewFormSubmit.bind(this))
    },

    onNewFormSubmit: function(e) {
        e.preventDefault();
        const radioBtn = document.querySelector("[data-dom=radio]:checked");
    
        const newTask = {
            name: this.noteInput.value,
            time:new Date (),
            icon: radioBtn.value
        };
        this.createNewNote(newTask);
        this.newForm.reset();
    },



    addSliderItems: function(){
        this.sliderItems.forEach((item)=> {
        let newSliderItem = document.createElement("div");
    
        let sliderItem = ` 
        <label class="label">
            <input type="radio" class="radio" name="radio"  value="${item.icon}" ${item.checked || " "} data-dom="radio">
            <span class="icon icon_slider"><i class="fas fa-${item.icon}"></i></span>
            <p class="slider__text">${item.name}</p>
        </label>`;

        newSliderItem.classList.add("slider__item");
        newSliderItem.innerHTML = sliderItem;
        this.slider.append(newSliderItem);
    })
}
}