AFRAME.registerComponent("cursor-listener", {
  schema: {
    selectedItemId: { default: "", type: "string" }
  },
  init: function() {
    this.handleClickEvents();
    this.handleMouseEnterEvents();
    this.handleMouseLeaveEvents();
  },
  handleClickEvents: function() {
    //  Click Events
    this.el.addEventListener("click", evt => {
      const placesContainer = document.querySelector("#places-container");
      const { state } = placesContainer.getAttribute("tour");

      if (state === "places-list") {
        const id = this.el.getAttribute("id");
        const placesId = ["place-home", "place-garden", "place-main_gate"];
        if (placesId.includes(id)) {
          placesContainer.setAttribute("tour", {
//change the state as per requirements

            state: "View",
            selectedPlace: id
          });
        }
      }

      if (state === "view") {
        this.handleViewState();
      }
      if (state === "change-view") {
        this.handleViewState();
      }
    });
  },
  handleViewState: function() {
    const el = this.el;

    const id = el.getAttribute("id");

    const placesContainer = document.querySelector("#places-container");

    const { selectedItemId } = placesContainer.getAttribute("cursor-listener");

    //Keeping all the images as id of the images with .jpg extension
    const sideViewPlacesId = ["place-1", "place-2", "place-3", "place-4"];

    if (sideViewPlacesId.includes(id)) {
      
      placesContainer.setAttribute("tour", {
        state: "change-view"
      });
    }
    },
  

  handleMouseEnterEvents: function() {
    // Mouse Center Events
    this.el.addEventListener("mouseenter", () => {
      const placeContainer = document.querySelector("#places-container");
      const { state } = placeContainer.getAttribute("tour");
      if (state === "places-list") {
        this.handlePlacesListState();
      }
    });
  },
  handlePlacesListState: function() {
    const id = this.el.getAttribute("id");
    const placesId = ["place-home", "place-garden", "place-main_gate"];
    if (placesId.includes(id)) {
      const placeContainer = document.querySelector("#places-container");
      placeContainer.setAttribute("cursor-listener", {
        selectedItemId: id
      });
      this.el.setAttribute("material", {
        opacity: 1
      });
    }
  },
  handleMouseLeaveEvents: function() {
    // Mouse Leave Events
    this.el.addEventListener("mouseleave", () => {
      const placesContainer = document.querySelector("#places-container");
      const { state } = placesContainer.getAttribute("tour");
      if (state === "places-list") {
        const { selectedItemId } = this.data;
        if (selectedItemId) {
          const el = document.querySelector(`#${selectedItemId}`);
          const id = el.getAttribute("id");
          if (id == selectedItemId) {
            el.setAttribute("material", {
              opacity: 0.4
            });
          }
        }
      }
    });
  }
});
