window.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed');
  start()
})

function start() {
  let idGlobal = 8;

  var app = new Vue({
    el: '#app',
    components: {
      draggable: window['vuedraggable']
    },
    data() {
      return {
        list1: [
          { name: "dog 1", id: 1 },
          { name: "dog 2", id: 2 },
          { name: "dog 3", id: 3 },
          { name: "dog 4", id: 4 }
        ],
        list2: [
          { name: "cat 5", id: 5 },
          { name: "cat 6", id: 6 },
          { name: "cat 7", id: 7 }
        ]
      };
    },
    methods: {
      log: function (evt) {
        window.console.log(evt);
      },
      cloneDog({ id, name }) {
        console.log(id)
        return {
          id,
          name
          // name: `cat ${id}`
        };
      }
    }
  })

  var ex = {
    name: "custom-clone",
    display: "Custom Clone",
    order: 3,
    components: {
      draggable
    },
    data() {
      return {
        list1: [
          { name: "dog 1", id: 1 },
          { name: "dog 2", id: 2 },
          { name: "dog 3", id: 3 },
          { name: "dog 4", id: 4 }
        ],
        list2: [
          { name: "cat 5", id: 5 },
          { name: "cat 6", id: 6 },
          { name: "cat 7", id: 7 }
        ]
      };
    },
    methods: {
      log: function (evt) {
        window.console.log(evt);
      },
      cloneDog({ id }) {
        return {
          id: idGlobal++,
          name: `cat ${id}`
        };
      }
    }
  };
}