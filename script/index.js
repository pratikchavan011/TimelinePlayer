window.state = {
  e: {}, //Elements,
  eL: {}, //Layer Elements inside #screen,
  c: [
    {
      class: "component",
      type: "Image",
      img: "../images/forest.jpg", // Placeholder Image
    },
    {
      class: "component",
      type: "Text",
      text: "Text",
    },
    {
      class: "component",
      type: "Button",
      img: "", // Placeholder Image
    },
    {
      class: "component",
      type: "Square",
      img: "", // Placeholder Image
    },
    {
      class: "component",
      type: "Circle",
      img: "", // Placeholder Image
    },
  ], //Component Data
  l: [
    /* {
      id: "image",
      label: "image",
      properties: [
        {
          name: "scale",
          keys: [
            {
              time: 0,
              val: 1,
            },
            {
              time: 2.718,
              val: 1.5,
              ease: "Cubic.easeInOut",
            },
          ],
          val: 1,
        },
      ],
      values: {
        scale: 1.1741241094283317,
      },
    },
    {
      id: "overlay",
      label: "overlay",
      properties: [
        {
          name: "opacity",
          keys: [
            {
              time: 0,
              val: 0,
            },
            {
              time: 2.718,
              val: 1,
              ease: "Linear.easeNone",
            },
          ],
          val: 0,
          min: 0,
          max: 1,
        },
      ],
      values: {
        opacity: 0.681383370125092,
      },
    },
    {
      id: "zoom",
      label: "zoom",
      properties: [
        {
          name: "opacity",
          keys: [
            {
              time: 1.316,
              val: 0,
            },
            {
              time: 2.1640000000000033,
              val: 1,
              ease: "Linear.easeNone",
            },
          ],
          val: 0,
          min: 0,
          max: 1,
        },
        {
          name: "y",
          keys: [
            {
              time: 1.316,
              val: 60,
            },
            {
              time: 2.1640000000000033,
              val: 0,
              ease: "Quint.easeOut",
            },
          ],
          val: 60,
        },
      ],
      values: {
        opacity: 0.6320754716981108,
        y: 0.40452462055827,
      },
    },
    {
      id: "caption",
      label: "caption",
      properties: [
        {
          name: "rotation",
          keys: [
            {
              time: 1.766,
              val: -100,
            },
            {
              time: 2.718,
              val: 0,
              ease: "Cubic.easeOut",
            },
          ],
          val: -100,
        },
      ],
      values: {
        rotation: -75.27362495912845,
      },
    },
    {
      id: "title",
      label: "title",
      properties: [
        {
          name: "x",
          keys: [],
          val: 0,
        },
        {
          name: "opacity",
          keys: [
            {
              time: 1.835,
              val: 0,
            },
            {
              time: 2.1989999999999985,
              val: 1,
              ease: "Quad.easeOut",
            },
          ],
          val: 0,
          min: 0,
          max: 1,
        },
      ],
      values: {
        x: 0,
        opacity: 0.09122539548363817,
      },
    },
    {
      id: "credit",
      label: "credit",
      properties: [
        {
          name: "x",
          keys: [],
          val: 0,
        },
        {
          name: "opacity",
          keys: [
            {
              time: 2.008,
              val: 0,
            },
            {
              time: 2.493,
              val: 1,
            },
          ],
          val: 0,
          min: 0,
          max: 1,
        },
      ],
      values: {
        x: 0,
        opacity: 0,
      },
    }, */
  ], //Layers Data
  d: {
    // Other data
    isMenuOpen: false,
    draggingType: "",
    animationDuration: 10 * 1000, //In seconds
  },
};

function init() {
  window.state.e["$body"] = $("body");
  window.state.e["$menuToggleBtn"] = $("#menuToggle");
  window.state.e["$menuPanel"] = $("#menu");
  window.state.e["$component"] = $(".component");
  window.state.e["$screen"] = $("#screen");
  window.state.e["$componentContainer"] = $("#componentContainer");
  //   window.state.e["$editBtn"] = $(".edit");
  //   window.state.e.$img = $(".thumb__image img");
  //   window.state.e.$overlay = $(".thumb__overlay");
  //   window.state.e.$zoom = $(".thumb__zoom");
  //   window.state.e.$caption = $(".thumb__caption");
  //   window.state.e.$title = $(".thumb__title");
  //   window.state.e.$credit = $(".thumb__credit");
  updateTimeLine();
  //   window.state.d.image_values = tweenTime.getValues("image");
  //   window.state.d.overlay_values = tweenTime.getValues("overlay");
  //   window.state.d.zoom_values = tweenTime.getValues("zoom");
  //   window.state.d.caption_values = tweenTime.getValues("caption");
  //   window.state.d.title_values = tweenTime.getValues("title");
  //   window.state.d.credit_values = tweenTime.getValues("credit");

  addComponents();
  addEvents();
  addDraggable();
  addDroppable();
  animate();
}

function updateTimeLine() {
  const tweenTime = new TweenTime.Core(window.state.l, {
    totalDuration: 10000, // in milliseconds
  });
  window.state.d.editor = new TweenTime.Editor(tweenTime, {
    domainStart: 0,
    domainEnd: 4000,
  });
  window.state.d.tweenTime = tweenTime;
}

function addEvents() {
  const { $menuToggleBtn } = window.state.e;
  $menuToggleBtn.on("click", menuToggleClickEv);
}

function addComponents() {
  const { c, e } = window.state;
  let elementHolder = "";
  c.forEach((data, i) => {
    elementHolder += `<div id=${data.class + i} class=${data.class} data-type=${
      data.type
    }>${data.type}</div>`;
  });
  e.$componentContainer.html(elementHolder);

  window.state.e["$component"] = $(".component");
}

function addDraggable() {
  const { $component, $body } = window.state.e;
  $component.draggable({
    containment: $body,
    helper: "clone",
    start: (event, ui) => {
      const { target } = event;
      console.log(event, ui, "start");
      window.state.d.draggingType = $(target).data("type");
    },
    revert: (d) => {
      console.log(d, "revert");
      if (!d) {
        // reverted
        window.state.d.draggingType = "";
        return false;
        //   } else {
        //     // dropped on droppable
        //     return true;
      }
    },
    // revert: "invalid",
  });
}

function addDroppable() {
  const { $screen } = window.state.e;
  $screen.droppable({
    accept: ".component",
    greedy: true,
    tolerance: "fit",
    drop: function (event, ui) {
      const L_length = window.state.l.length;
      const { left, top } = $(ui.helper[0]).position();
      let layerObj, element;
      console.log(event, " event, ui ", ui, ui.helper[0]);
      // ui.helper[0].remove(); // removing clone
      // Add new layer component here and destroy clone drag.
      layerObj = {
        id: L_length,
        label: `Layer_${L_length}`,
        properties: [
          {
            name: "left",
            keys: [
              {
                time: 0,
                val: left,
              },
            ],
            val: left,
          },
          {
            name: "top",
            keys: [
              {
                time: 0,
                val: top,
              },
            ],
            val: top,
          },
          {
            name: "width",
            keys: [
              {
                time: 0,
                val: 100,
              },
            ],
            val: 100,
          },
          {
            name: "height",
            keys: [
              {
                time: 0,
                val: 100,
              },
            ],
            val: 100,
          },
          {
            name: "scale",
            keys: [
              {
                time: 0,
                val: 1,
              },
            ],
            val: 1,
          },
          {
            name: "opacity",
            keys: [
              {
                time: 0,
                val: 1,
              },
            ],
            val: 1,
          },
          {
            name: "rotate",
            keys: [
              {
                time: 0,
                val: 0,
              },
            ],
            val: 0,
          },
        ],
        values: {
          left: left,
          top: top,
          width: 100,
          height: 100,
          scale: 1,
          opacity: 1,
          rotate: 0,
        },
      };
      const _style = `position:absolute; left:${left}px; top:${top}px;`;
      if (window.state.d.draggingType.toLowerCase() === "text") {
        element = `<p id="${L_length}" class='layer-component' style="${_style}">Text</p>`;
      } else if (window.state.d.draggingType.toLowerCase() === "image") {
        element = `<img id="${L_length}" class='layer-component' src='' alt='image' style="${_style}" />`;
      } else if (window.state.d.draggingType.toLowerCase() === "image") {
        element = `<Button id="${L_length}" class='layer-component' style="${_style}"></Button>`;
      } else {
        element = `<div id="${L_length}" class='layer-component' style="${_style}"></div>`;
      }

      const elementDom = $(element).appendTo($screen)[0];
      if (elementDom) window.state.eL[L_length] = elementDom;
      
      if (layerObj) window.state.l.push({...layerObj, "_$el": $(elementDom)});
      window.state.d.draggingType = "";
      updateTimeLine();
    },
  });
}

function menuToggleClickEv() {
  const { $menuPanel } = window.state.e;
  const { isMenuOpen } = window.state.d;
  console.log("isMenuOpen", isMenuOpen);
  if (isMenuOpen) {
    // closing menu
    $menuPanel.removeClass("open").addClass("close");
  } else {
    // opening menu
    $menuPanel.removeClass("close").addClass("open");
  }
  window.state.d.isMenuOpen = !isMenuOpen;
}

function animate() {
  //   const {
  //     image_values,
  //     overlay_values,
  //     zoom_values,
  //     caption_values,
  //     title_values,
  //     credit_values,
  //   } = window.state.d;
  const { eL, d } = window.state;
  const { tweenTime } = d;
  const elementsName = Object.keys(eL);
console.log('elementsName', elementsName)
  elementsName.map((o, i) => {
    const {
      left,
      top,
      width,
      height,
      scale,
      opacity,
      rotate,
    } = tweenTime.getValues(Number(o));
    console.log("animate", top, left, width, scale, opacity, rotate);
    $(eL[o]).css({
      transform: `scale(${scale},${scale}) rotate(${rotate}deg)`,
      left: `${left}px`,
      top: `${top}px`,
      width: `${width}px`,
      height: height ? `${height}px` : 'auto',
      opacity: opacity,
      opacity: opacity,
    });
  });
  //   $img.css({
  //     transform: "scale(" + image_values.scale + ", " + image_values.scale + ")",
  //   });
  //   $overlay.css({
  //     opacity: overlay_values.opacity,
  //   });
  //   $zoom.css({
  //     transform: "translate(0, " + zoom_values.y + "px)",
  //     opacity: zoom_values.opacity,
  //   });
  //   $caption.css({
  //     transform: "rotate(" + caption_values.rotation + "deg)",
  //   });
  //   $title.css({
  //     transform: "translate(" + title_values.x + "px, 0)",
  //     opacity: title_values.opacity,
  //   });
  //   $credit.css({
  //     transform: "translate(" + credit_values.x + "px, 0)",
  //     opacity: credit_values.opacity,
  //   });

  window.requestAnimationFrame(animate);
}

$(document).ready(init);
