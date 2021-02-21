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
        ],
        list2: [
          { name: "cat 5", id: 5, order: 1 },
          { name: "cat 6", id: 6, order: 1 },
          { name: "cat 7", id: 7, order: 1 }
        ]
      };
    },
    methods: {
      log: function (evt) {
        console.log(evt);
        console.log('change fired')
      },
      checkMove: function (evt) {
        console.log(evt)
        console.log('dragged COntext')
        console.log(evt.draggedContext)
        console.log('relatedContext')
        console.log(evt.relatedContext)
      },
      cloneDog({ id, name }) {
        console.log(id)
        return {
          id,
          name
          // name: `cat ${id}`
        };
      },
    }
  })
}