import React, { useState, useRef } from "react";
import './Work.css';
// import './canvasScripts'

import { fabric } from 'fabric'

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
    var canvasJson = useRef([])
    var commentValue = useRef('')
    var canvases = useRef([]), ctxs = [], flags = [],
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


    const [canvasState, setCanvasState] = useState([])
    const [objects, setObjects] = useState(work.objects);
    const [objectSpans, setObjectSpans] = useState();
    const [canvasList, setCanvasList] = useState([])
    const [commentState, setCommentState] = useState(false)
    // const [commentValue, setCommentValue] = useState('')
    const [commentInputSpan, setCommentInputSpan] = useState()
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

    // let gradingTool = tools.SYMBOL; 
    let gradingTool = useRef(tools.SYMBOL)
    let canvasInitiation = useRef(false);

    console.log("asd" + props.assignment.id);
    const listSubmitted = work.works.map((submit, index) =>
        <img id={"work-img-" + index} index={index} src={submit} onClick={(e) => imageClicked(e, index)} style={{ width: '100%' }} />
    )

    function initCanvas() {
        if (canvasInitiation.current == false || true) {
            console.log("Initating canvas", canvasInitiation.current)
            var _canvasList = work.works.map((submit, index) => {

                var _img = document.getElementById('work-img-' + index)
                var _width = _img.clientWidth
                var _height = _img.clientHeight
                return (
                    <canvas id={"work-canvas-" + index} className="my-canvas" style={{ border: "1px solid" }} width={_width} height={_height} />
                )
            })
            setCanvasList(_canvasList)

            // TODO: truyen vao bien canvas id, init voi moi canvas
            function init(i) {
                fabric.Object.prototype.objectCaching = true;

                var canvasId = "work-canvas-" + i
                canvases.current[i] = new fabric.Canvas(canvasId, {
                    isDrawingMode: true,
                    freeDrawingBrush: new fabric.PencilBrush({ decimate: 8 })
                });
                console.log(canvases.current[i])
                canvasInitiation.current = true
            }

            for (let i = 0; i < work.works.length; i++) {
                init(i)
                // ctxs[i].beginPath();
                // ctxs[i].moveTo(0, 0);
                // ctxs[i].lineTo(100, 100);
                // ctxs[i].strokeStyle = x;
                // ctxs[i].lineWidth = y;
                // ctxs[i].stroke();
                // ctxs[i].closePath();
            }
        }
    }

    function imageClicked(e, i) {
        if (gradingTool.current == tools.SYMBOL) {
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
                } else if (object.type == symbol.COMMENT) {
                    return (
                        <span className="object-comment-container" onClick={(e) => objectClicked(e, object.left, object.top)} style={{ left: object.left, top: (object.top + imgHeight), color: "red", fontWeight: "bold" }}>
                            {object.value}
                        </span>
                    )
                }
                return (
                    <span className="object-symbol-container" onClick={(e) => objectClicked(e)} style={{ left: object.left, top: (object.top + imgHeight) }}>
                        <img className="object-symbol object" src={_src} />
                    </span>
                )
            }))
        } else if (gradingTool.current == tools.COMMENT) {
            console.log("Image layer Clicked height" + i);
            var imgHeight = 0
            for (let j = 0; j < i; j++) {
                imgHeight += document.getElementById('work-img-' + j).clientHeight
            }
            var rect = e.target.getBoundingClientRect();
            console.log("rect: " + rect.top + " " + rect.left)
            var x = e.clientX - rect.left; //x position within the element.
            var y = e.clientY - rect.top;  //y position within the element.
            x -= 10
            y -= 10
            console.log("Left? : " + x + " ; Top? : " + y + ".");
            console.log(commentState)
            setCommentState(!commentState)
            if (commentState) {
                setCommentInputSpan(
                    <span className="object-comment-container" style={{ left: x, top: (y + imgHeight), color: "red", fontWeight: "bold" }}>
                        <form x={x} y={y} onSubmit={(e) => handleSubmit(e, x, y, i)}>
                            <input type="text" style={{ backgroundColor: "rgba(0,0,0,0.2)", color: "red", fontWeight: "bold", textAlign: "initial", padding: "unset" }}
                                onChange={(e) => handleCommentChange(e)}></input>
                        </form>
                    </span>
                )
            } else {
                setCommentInputSpan(<></>)
            }
        }
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
                } else if (objects[i].type == symbol.WRONG || objects[i].type == symbol.COMMENT) {
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
                return (
                    <span className="object-symbol-container" onClick={(e) => objectClicked(e, object.left, object.top)} style={{ left: object.left, top: (object.top + imgHeight) }}>
                        <img className="object-symbol object" src={_src} />
                    </span>
                )
            } else if (object.type == symbol.WRONG) {
                _src = symbol.WRONG_IMG
                return (
                    <span className="object-symbol-container" onClick={(e) => objectClicked(e, object.left, object.top)} style={{ left: object.left, top: (object.top + imgHeight) }}>
                        <img className="object-symbol object" src={_src} />
                    </span>
                )
            } else if (object.type == symbol.COMMENT) {
                return (
                    <span className="object-comment-container" onClick={(e) => objectClicked(e, object.left, object.top)} style={{ left: object.left, top: (object.top + imgHeight), color: "red", fontWeight: "bold" }}>
                        {object.value}
                    </span>
                )
            }
        }))
    }
    function toolCommentClicked() {
        gradingTool.current = tools.COMMENT
        console.log("Tool Comment Clicked" + gradingTool.current);
        document.getElementById('drawing-layer').style.zIndex = "3"
    }

    function toolPenClicked() {
        gradingTool.current = tools.PEN;
        console.log("Tool Pen Clicked" + gradingTool.current);
        document.getElementById('drawing-layer').style.zIndex = "5"
        initCanvas()
        // var canvasId = "work-canvas-" + i
        // canvases.current[i] = new fabric.Canvas(canvasId, {
        //     isDrawingMode: true,
        //     freeDrawingBrush: new fabric.PencilBrush({ decimate: 8 })
        // });
        for (let i = 0; i < work.works.length; i++) {
            canvases.current[i].freeDrawingBrush = new fabric.PencilBrush(canvases.current[i]);
            canvases.current[i].freeDrawingBrush.width = 2;
            canvases.current[i].isDrawingMode = true;
        }
    }

    function toolSymbolClicked() {
        gradingTool.current = tools.SYMBOL
        console.log("Tool Symbol Clicked" + gradingTool.current);
        document.getElementById('drawing-layer').style.zIndex = "3"
    }

    function toolEraserClicked() {
        gradingTool.current = tools.ERASER
        console.log("Tool Eraser Clicked" + gradingTool);
        document.getElementById('drawing-layer').style.zIndex = "5"
        // initCanvas() // Thu xoa di xem sao
        // var canvasId = "work-canvas-" + i
        // canvases.current[i] = new fabric.Canvas(canvasId, {
        //     isDrawingMode: true,
        //     freeDrawingBrush: new fabric.PencilBrush({ decimate: 8 })
        // });
        for (let i = 0; i < work.works.length; i++) {
            canvases.current[i].freeDrawingBrush = new fabric.EraserBrush(canvases.current[i]);
            canvases.current[i].freeDrawingBrush.width = 2;
            canvases.current[i].isDrawingMode = true;
        }
    }

    function toolSaveClicked() {
        // var saveCanvas = new fabric.Canvas('work-canvas-0')
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

        console.log("Tool Save Clicked");

        // use ref
        for (let i = 0; i < work.works.length; i++) {
            canvasJson.current[i] = JSON.stringify(canvases.current[i].toJSON())
            console.log(JSON.stringify(canvases.current[i].toJSON()))
        }

        // use state
        // for (let i = 0; i < work.works.length; i++) {
        //     canvasState[i] = JSON.stringify(canvases.current[i].toJSON())
        //     setCanvasState(canvasState)
        // } 
    }

    function toolLoadClicked() {
        console.log("Tool Load Clicked");

        // use ref
        for (let i = 0; i < work.works.length; i++) {
            canvases.current[i].loadFromJSON(canvasJson.current[i], function () {
                canvases.current[i].renderAll();
            }, function (o, object) {
                console.log(o, object)
            })
        }

        // use state
        // for (let i = 0; i < work.works.length; i++) {
        //     canvases.current[i].loadFromJSON(canvasJson, function() {
        //         canvases.current[0].renderAll(); 
        //     },function(o,object){
        //         console.log(o,object)
        //     })
        // }
    }

    function sendToServerClicked() {
        console.log("Send to Server later")
    }

    function handleSubmit(e, x, y, i) {
        console.log("submit value:", commentValue.current, x, y)
        e.preventDefault()
        setCommentState(!commentState)
        setCommentInputSpan(<></>)
        objects.push({ left: x + 2, top: y + 7, image: i, type: symbol.COMMENT, value: commentValue.current })
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
                return (
                    <span className="object-symbol-container" onClick={(e) => objectClicked(e)} style={{ left: object.left, top: (object.top + imgHeight) }}>
                        <img className="object-symbol object" src={_src} />
                    </span>
                )
            } else if (object.type == symbol.WRONG) {
                _src = symbol.WRONG_IMG
                return (
                    <span className="object-symbol-container" onClick={(e) => objectClicked(e)} style={{ left: object.left, top: (object.top + imgHeight) }}>
                        <img className="object-symbol object" src={_src} />
                    </span>
                )
            } else if (object.type == symbol.COMMENT) {
                return (
                    <span className="object-comment-container" onClick={(e) => objectClicked(e, object.left, object.top)} style={{ left: object.left, top: (object.top + imgHeight), color: "red", fontWeight: "bold" }}>
                        {object.value}
                    </span>
                )
            }
        }))
    }
    function handleCommentChange(e) {
        console.log('comment value:', e.target.value)
        // setCommentValue(e.target.value)
        commentValue.current = e.target.value
        console.log('comment state:', commentValue.current)
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
                        <button className="grading-tool" id="tool-save" onClick={() => toolSaveClicked()}>Save</button>
                        <button className="grading-tool" id="tool-load" onClick={() => toolLoadClicked()}>Load</button>
                        <button className="grading-tool" id="tool-send-to-server" onClick={() => sendToServerClicked()}>Send to Server</button>
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
                        <div>
                            {commentInputSpan}
                            {/* <span className="object-comment-container" style={{ left: 200, top: 200, color: "red", fontWeight: "bold" }}>
                                <form onSubmit={(e) => handleSubmit(e)}>
                                    <input type="text" style={{ backgroundColor: "rgba(0,0,0,0.2)", color: "red", fontWeight: "bold" }}
                                        value={commentValue} onChange={(e) => handleCommentChange(e)}></input>
                                </form>
                            </span> */}
                        </div>
                    </div>
                </div>
                <div className="col" id="grading-comment-section">
                    Asking Section
                </div>
            </div>
        </div>
    )
}