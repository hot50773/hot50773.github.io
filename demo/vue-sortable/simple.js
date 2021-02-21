window.addEventListener('DOMContentLoaded', (event) => {
  var app = new Vue({
    el: '#app',
    components: {
      draggable: window['vuedraggable']
    },
    data() {
      return {
        myArray: [
          {
            name: "dog 1", id: 1,
    "order": 1
          },
          {
            name: "dog 2", id: 2,
    "order": 2
          },
          {
            name: "dog 3", id: 3,
    "order": 3
          },
          {
            name: "dog 4", id: 4,
    "order": 4
          }
        ]
      };
    }
  })
})