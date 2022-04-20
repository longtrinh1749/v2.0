let erasingRemovesErasedObjects = false;
function changeAction(target) {
    ['select', 'erase', 'undo', 'draw', 'spray'].forEach(action => {
        const t = document.getElementById(action);
        t.classList.remove('active');
    });
    if (typeof target === 'string') target = document.getElementById(target);
    target.classList.add('active');
    switch (target.id) {
        case "erase":
            canvas.freeDrawingBrush = new fabric.EraserBrush(canvas);
            canvas.freeDrawingBrush.width = 35;
            canvas.isDrawingMode = true;
            break;
        default:
            canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
            canvas.freeDrawingBrush.width = 35;
            canvas.isDrawingMode = true;
            break;
    }
}
function init() {
    canvas.setOverlayColor("rgba(0,0,255,0.4)", undefined, { erasable: false });
    const t = new fabric.Triangle({
        top: 300,
        left: 210,
        width: 100,
        height: 100,
        fill: "blue",
        erasable: false
    });

    canvas.add(
        new fabric.Rect({
            top: 50,
            left: 100,
            width: 50,
            height: 50,
            fill: "#f55",
            opacity: 0.8
        }),
        new fabric.Rect({
            top: 50,
            left: 150,
            width: 50,
            height: 50,
            fill: "#f55",
            opacity: 0.8
        }),
        new fabric.Group([
            t,
            new fabric.Circle({ top: 140, left: 230, radius: 75, fill: "green" })
        ], { erasable: 'deep' })
    );
    fabric.Image.fromURL('https://ip.webmasterapi.com/api/imageproxy/http://fabricjs.com/assets/mononoke.jpg',
        function (img) {
            // img.set("erasable", false);
            img.scaleToWidth(480);
            img.clone((img) => {
                canvas.add(
                    img
                        .set({
                            left: 400,
                            top: 350,
                            clipPath: new fabric.Circle({
                                radius: 200,
                                originX: "center",
                                originY: "center"
                            }),
                            angle: 30
                        })
                        .scale(0.25)
                );
                canvas.renderAll();
            });

            img.set({ opacity: 0.7 });
            function animate() {
                img.animate("opacity", img.get("opacity") === 0.7 ? 0.4 : 0.7, {
                    duration: 1000,
                    onChange: canvas.renderAll.bind(canvas),
                    onComplete: animate
                });
            }
            animate();
            canvas.setBackgroundImage(img);
            img.set({ erasable: false });
            canvas.on("erasing:end", ({ targets, drawables }) => {
                var output = document.getElementById("output");
                output.innerHTML = JSON.stringify({
                    objects: targets.map((t) => t.type),
                    drawables: Object.keys(drawables)
                }, null, '\t');
                if (erasingRemovesErasedObjects) {
                    targets.forEach(obj => obj.group?.removeWithUpdate(obj) || canvas.remove(obj));
                }
            })
            canvas.renderAll();
        },
        { crossOrigin: "anonymous" }
    );

    function animate() {
        try {
            canvas
                .item(0)
                .animate("top", canvas.item(0).get("top") === 500 ? "100" : "500", {
                    duration: 1000,
                    onChange: canvas.renderAll.bind(canvas),
                    onComplete: animate
                });
        } catch (error) {
            setTimeout(animate, 500);
        }
    }
    animate();
}

const setDrawableErasableProp = (drawable, value) => {
    canvas.get(drawable)?.set({ erasable: value });
    changeAction('erase');
};

const setBgImageErasableProp = (input) =>
    setDrawableErasableProp("backgroundImage", input.checked);

const setErasingRemovesErasedObjects = (input) =>
    (erasingRemovesErasedObjects = input.checked);

const canvas = this.__canvas = new fabric.Canvas('work-canvas-0');
init();
