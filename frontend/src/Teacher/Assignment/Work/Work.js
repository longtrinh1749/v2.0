import React, { useState } from "react";
import './Work.css';
// import './canvasScripts'
import {fabric} from 'fabric'

function callGetWork(credentials) {
    // return fetch('http://localhost:8080/classes', {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(credentials)
    // })
    // .then(data => data.json())
    return {
        "studentName": "Bùi Trung Anh",
        "class": "Math 2",
        "school": "TH Thịnh Liệt",
        "status": "Graded",
        "grade": "9",
        "works": [
            "sample/data/AssignmentDetail/Bùi Trung Anh/trang_0.jpg",
            "sample/data/AssignmentDetail/Bùi Trung Anh/trang_1.jpg",
            "sample/data/AssignmentDetail/Bùi Trung Anh/trang_2.jpg",
        ],
        "objects": []
    }
}

// function getScrollHeight() {
//     return document.getElementById("img-layer").scrollHeight;
// }

function drawingCanvas() {
    console.log("Canvas layer Clicked");
}

export default function Work(props) {
    // Canvas variable 
    var canvases = [], ctxs = [], flags = [],
        prevXs = [],
        currXs = [],
        prevYs = [],
        currYs = [],
        dot_flags = [];
    var x = "black",
        y = 2;

    // Symbol variable
    const work = callGetWork()
    const symbol = {
        WRONG: 'wrong',
        RIGHT: 'right',
        WRONG_IMG: "img/wrong1.png",
        RIGHT_IMG: "img/right1.png",
        WIDTH: 40,
        HEIGHT: 40,
        COMMENT: 'comment',
    }

    const [objects, setObjects] = useState(work.objects);
    const [objectSpans, setObjectSpans] = useState();
    const [canvasList, setCanvasList] = useState([])
    // var objectSpans = objects.map((object, index) => 
    //     <span className="object-symbol-container" style={{left:object.left, top:object.top}}>
    //         <img className="object-symbol object" src="img/right1.png" />
    //     </span>
    //     )

    const tools = {
        SYMBOL: "SYMBOL",
        PEN: "PEN",
        COMMENT: "COMMENT",
        ERASER: "ERASER",
        ERASE_SIZE: 20
    }

    var gradingTool = tools.SYMBOL;
    console.log("asd" + props.assignment.id);
    const listSubmitted = work.works.map((submit, index) =>
        <img id={"work-img-" + index} index={index} src={submit} onClick={(e) => imageClicked(e, index)} style={{ width: '100%' }} />
    )
    var canvasInitiation = false;

    function initCanvas() {
        if (canvasInitiation == false || true) {
            var _canvasList = work.works.map((submit, index) => {

                var _img = document.getElementById('work-img-' + index)
                var _width = _img.clientWidth
                var _height = _img.clientHeight
                return (
                    <canvas id={"work-canvas-" + index} className="my-canvas" style={{ border: "1px solid" }} width={_width} height={_height} />
                )
            })
            setCanvasList(_canvasList)
            canvasInitiation = true

            // TODO: truyen vao bien canvas id, init voi moi canvas
            function init(i) {
                flags[i] = false
                prevXs[i] = 0
                prevYs[i] = 0
                currXs[i] = 0
                currYs[i] = 0
                dot_flags[i] = false
                console.log("init canvas", i)
                canvases[i] = document.getElementById("work-canvas-" + i);
                ctxs[i] = canvases[i].getContext("2d");
                var w = canvases[i].width;
                var h = canvases[i].height;

                canvases[i].addEventListener("mousemove", function (e) {
                    findxy('move', e, i)
                }, false);
                canvases[i].addEventListener("mousedown", function (e) {
                    findxy('down', e, i)
                }, false);
                canvases[i].addEventListener("mouseup", function (e) {
                    findxy('up', e, i)
                }, false);
                canvases[i].addEventListener("mouseout", function (e) {
                    findxy('out', e, i)
                }, false);
            }

            function findxy(res, e, i) {
                if (res == 'down') {
                    var rect = canvases[i].getBoundingClientRect()
                    console.log("rect ", rect.left, rect.top)
                    prevXs[i] = currXs[i];
                    prevYs[i] = currYs[i];
                    // currX = e.clientX - canvas.offsetLeft;
                    // currY = e.clientY - canvas.offsetTop;
                    currXs[i] = e.clientX - rect.left;
                    currYs[i] = e.clientY - rect.top;

                    flags[i] = true;
                    dot_flags[i] = true;
                    if (dot_flags[i] && gradingTool == tools.PEN) {
                        console.log("Drawing")
                        ctxs[i].beginPath();
                        ctxs[i].fillStyle = x;
                        ctxs[i].fillRect(currXs[i], currYs[i], 2, 2);
                        ctxs[i].closePath();
                        dot_flags[i] = false;
                    }
                }
                if (res == 'up' || res == "out") {
                    flags[i] = false;
                    if (res == 'up') {
                        console.log(prevXs[i], prevYs[i])
                        console.log(currXs[i], currYs[i])
                    }
                }
                if (res == 'move') {
                    if (flags[i]) {
                        var rect = canvases[i].getBoundingClientRect()
                        console.log("rect ", rect.left, rect.top)
                        prevXs[i] = currXs[i];
                        prevYs[i] = currYs[i];
                        // currX = e.clientX - canvas.offsetLeft;
                        // currY = e.clientY - canvas.offsetTop;
                        currXs[i] = e.clientX - rect.left;
                        currYs[i] = e.clientY - rect.top;
                        if (gradingTool == tools.PEN) draw(i);
                        else if (gradingTool == tools.ERASER) erase(i);
                    }
                }
            }

            function draw(i) {
                console.log(gradingTool)
                console.log("Drawing")
                ctxs[i].beginPath();
                ctxs[i].moveTo(prevXs[i], prevYs[i]);
                ctxs[i].lineTo(currXs[i], currYs[i]);
                ctxs[i].strokeStyle = x;
                ctxs[i].lineWidth = y;
                ctxs[i].stroke();
                ctxs[i].closePath();
            }
            function erase(i) {
                // tâm xóa sẽ ở trỏ chuột
                ctxs[i].clearRect(
                    currXs[i] - tools.ERASE_SIZE,
                    currYs[i] - tools.ERASE_SIZE,
                    2 * tools.ERASE_SIZE,
                    2 * tools.ERASE_SIZE)
                // ctxs[i].clearRect(currXs[i], currYs[i], 2, 2)
            }
            for (let i = 0; i < work.works.length; i++) {
                init(i)
                ctxs[i].beginPath();
                ctxs[i].moveTo(0, 0);
                ctxs[i].lineTo(100, 100);
                ctxs[i].strokeStyle = x;
                ctxs[i].lineWidth = y;
                ctxs[i].stroke();
                ctxs[i].closePath();
            }
        }
    }
    function imageClicked(e, i) {
        console.log("Image layer Clicked height" + i);
        var rect = e.target.getBoundingClientRect();
        console.log("rect: " + rect.top + " " + rect.left)
        var x = e.clientX - rect.left; //x position within the element.
        var y = e.clientY - rect.top;  //y position within the element.
        console.log("Left? : " + x + " ; Top? : " + y + ".");
        objects.push({ left: x - 30, top: y - 30, image: i, type: symbol.RIGHT })
        setObjects(objects)
        console.log(objects)
        setObjectSpans(objects.map((object, index) => {
            var imgHeight = 0
            for (let i = 0; i < object.image; i++) {
                imgHeight += document.getElementById('work-img-' + i).clientHeight
            }
            let _src = ""
            if (object.type == symbol.RIGHT) {
                _src = symbol.RIGHT_IMG
            } else if (object.type == symbol.WRONG) {
                _src = symbol.WRONG_IMG
            }
            return (
                <span className="object-symbol-container" onClick={(e) => objectClicked(e)} style={{ left: object.left, top: (object.top + imgHeight) }}>
                    <img className="object-symbol object" src={_src} />
                </span>
            )
        }))
    }

    function objectClicked(e, l, t) {
        console.log("Objectt Clicked" + e);
        // var rect = e.target.getBoundingClientRect();
        // var x = e.clientX - rect.left; //x position within the element.
        // var y = e.clientY - rect.top;  //y position within the element.
        var objectIndexToRemove = -1
        console.log("mouse location ", l, t);
        for (let i = 0; i < objects.length; i++) {
            // if (objects[i].left > x && objects[i].left < (x + symbol.WIDTH) && objects[i].top > y && objects[i].top < (y + symbol.HEIGHT)) {
            if (objects[i].left == l && objects[i].top == t) {
                if (objects[i].type == symbol.RIGHT) {
                    objects[i].type = symbol.WRONG
                    break
                } else if (objects[i].type == symbol.WRONG) {
                    objectIndexToRemove = i
                    break
                }
            }
        }
        console.log("found right symbol " + objectIndexToRemove)
        if (objectIndexToRemove > -1) {
            objects.splice(objectIndexToRemove, 1)
        }
        setObjects(objects)
        setObjectSpans(objects.map((object, index) => {
            var imgHeight = 0
            for (let i = 0; i < object.image; i++) {
                imgHeight += document.getElementById('work-img-' + i).clientHeight
            }
            let _src = ""
            if (object.type == symbol.RIGHT) {
                _src = symbol.RIGHT_IMG
            } else if (object.type == symbol.WRONG) {
                _src = symbol.WRONG_IMG
            }
            return (
                <span className="object-symbol-container" onClick={(e) => objectClicked(e, object.left, object.top)} style={{ left: object.left, top: (object.top + imgHeight) }}>
                    <img className="object-symbol object" src={_src} />
                </span>
            )
        }))
    }
    function toolCommentClicked() {
        gradingTool = tools.COMMENT
        console.log("Tool Comment Clicked" + gradingTool);
        document.getElementById('drawing-layer').style.zIndex = "3"
    }

    function toolPenClicked() {
        gradingTool = tools.PEN
        console.log("Tool Pen Clicked" + gradingTool);
        document.getElementById('drawing-layer').style.zIndex = "5"
        initCanvas()
    }

    function toolSymbolClicked() {
        gradingTool = tools.SYMBOL
        console.log("Tool Symbol Clicked" + gradingTool);
        document.getElementById('drawing-layer').style.zIndex = "3"
    }

    function toolEraserClicked() {
        gradingTool = tools.ERASER
        console.log("Tool Eraser Clicked" + gradingTool);
        document.getElementById('drawing-layer').style.zIndex = "5"
        initCanvas()
    }

    function toolSaveClicked() {
        var saveCanvas = new fabric.Canvas('work-canvas-0')
        console.log(JSON.stringify(saveCanvas.toJSON()))
        // create a rectangle object
        // var rect = new fabric.Rect({
        //   left: 100,
        //   top: 100,
        //   fill: 'red',
        //   width: 20,
        //   height: 20
        // });
        
        // // "add" rectangle onto canvas
        // saveCanvas.add(rect);
    }

    function toolLoadClicked() {
    }

    function objectLayerClicked(e) {
        console.log("Object layer Clicked");
        // var rect = e.target.getBoundingClientRect();
        // var x = e.clientX - rect.left; //x position within the element.
        // var y = e.clientY - rect.top;  //y position within the element.
        // console.log("Left? : " + x + " ; Top? : " + y + ".");
        // objects.push({left: x-30, top: y-30})
        // setObjects(objects)
        // console.log(objects)
        // setObjectSpans(objects.map((object, index) => 
        // <span className="object-symbol-container" style={{left:object.left, top:object.top}}>
        //     <img className="object-symbol object" src="img/right1.png" />
        // </span>
        // ))
    }
    return (
        <div className="container-fluid" id="word-wrapper">
            <div className="row">
                <div className="col sticky" id="grading-tool-section">
                    <div class="sticky">
                        <button className="grading-tool" id="tool-pen" onClick={() => toolPenClicked()}>Pen</button>
                        <button className="grading-tool" id="tool-symbol" onClick={() => toolSymbolClicked()}>Symbol</button>
                        <button className="grading-tool" id="tool-comment" onClick={() => toolCommentClicked()}>Comment</button>
                        <button className="grading-tool" id="tool-eraser" onClick={() => toolEraserClicked()}>Eraser</button>
                        <button className="grading-tool" id="tool-eraser" onClick={() => toolSaveClicked()}>Save</button>
                        <button className="grading-tool" id="tool-eraser" onClick={() => toolLoadClicked()}>Load</button>
                    </div>
                </div>
                <div className="col-7">
                    <div className="img-layer layer" id="img-layer">
                        {listSubmitted}
                    </div>
                    {// Sava va lay dc trang thai cua canvas roi apply trang thai do len canvas
                        // TODO: scale dc canvas neu thay doi size man hinh 
                        // TODO 2: scale dc ca symbol neu thay doi size man hinh
                    }
                    <div className="drawing-layer layer" id="drawing-layer" style={{ height: 2301 }}
                        onClick={drawingCanvas}>
                        {canvasList}
                    </div>

                    <div className="object-layer layer" id="object-layer"
                        // style={{ height: 2301 }}
                        onClick={objectLayerClicked}>
                        {/* <span className="object-symbol-container">
                            <img className="object-symbol object" src="img/right1.png" />
                        </span> */}
                        {objectSpans}
                        {/* <ObjectGradingLayer /> */}
                    </div>
                </div>
                <div className="col" id="grading-comment-section">
                    Comment Section
                </div>
            </div>
        </div>
    )
}