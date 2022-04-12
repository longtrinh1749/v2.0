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

            // canvases.current[i].loadFromJSON(JSON.parse('{"version":"5.2.1","objects":[{"type":"path","version":"5.2.1","originX":"left","originY":"top","left":7.21,"top":8,"width":820,"height":444,"fill":null,"stroke":"rgb(0, 0, 0)","strokeWidth":2,"strokeDashArray":null,"strokeLineCap":"round","strokeDashOffset":0,"strokeLineJoin":"round","strokeUniform":false,"strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"path":[["M",8.2146748046875,8.998],["Q",8.2166748046875,9,10.7166748046875,11],["Q",13.2166748046875,13,17.7166748046875,17],["Q",22.2166748046875,21,28.2166748046875,26],["Q",34.2166748046875,31,42.2166748046875,36.5],["Q",50.2166748046875,42,60.7166748046875,48],["Q",71.2166748046875,54,85.7166748046875,62.5],["Q",100.2166748046875,71,117.7166748046875,80.5],["Q",135.2166748046875,90,154.7166748046875,99.5],["Q",174.2166748046875,109,194.7166748046875,117.5],["Q",215.2166748046875,126,233.2166748046875,134],["Q",251.2166748046875,142,266.2166748046875,148.5],["Q",281.2166748046875,155,294.7166748046875,161],["Q",308.2166748046875,167,317.7166748046875,172],["Q",327.2166748046875,177,333.2166748046875,181],["Q",339.2166748046875,185,344.7166748046875,188],["Q",350.2166748046875,191,354.2166748046875,193.5],["Q",358.2166748046875,196,362.7166748046875,199],["Q",367.2166748046875,202,372.7166748046875,205.5],["Q",378.2166748046875,209,383.2166748046875,213],["Q",388.2166748046875,217,394.2166748046875,222],["Q",400.2166748046875,227,406.2166748046875,233.5],["Q",412.2166748046875,240,418.7166748046875,247],["Q",425.2166748046875,254,431.7166748046875,260],["Q",438.2166748046875,266,444.7166748046875,272],["Q",451.2166748046875,278,456.2166748046875,282.5],["Q",461.2166748046875,287,466.7166748046875,292],["Q",472.2166748046875,297,477.7166748046875,301],["Q",483.2166748046875,305,487.7166748046875,308.5],["Q",492.2166748046875,312,497.2166748046875,315],["Q",502.2166748046875,318,506.7166748046875,321],["Q",511.2166748046875,324,515.7166748046875,326.5],["Q",520.2166748046875,329,525.2166748046875,332],["Q",530.2166748046875,335,535.2166748046875,338],["Q",540.2166748046875,341,546.7166748046875,344],["Q",553.2166748046875,347,561.2166748046875,351],["Q",569.2166748046875,355,578.2166748046875,358.5],["Q",587.2166748046875,362,596.2166748046875,365.5],["Q",605.2166748046875,369,615.7166748046875,373],["Q",626.2166748046875,377,635.7166748046875,380.5],["Q",645.2166748046875,384,653.2166748046875,387],["Q",661.2166748046875,390,669.7166748046875,393],["Q",678.2166748046875,396,686.2166748046875,399],["Q",694.2166748046875,402,700.7166748046875,404.5],["Q",707.2166748046875,407,714.2166748046875,409.5],["Q",721.2166748046875,412,727.7166748046875,414],["Q",734.2166748046875,416,740.2166748046875,418.5],["Q",746.2166748046875,421,753.7166748046875,423.5],["Q",761.2166748046875,426,767.2166748046875,428.5],["Q",773.2166748046875,431,779.2166748046875,433.5],["Q",785.2166748046875,436,790.7166748046875,438],["Q",796.2166748046875,440,797.7166748046875,440],["Q",799.2166748046875,440,801.7166748046875,441.5],["Q",804.2166748046875,443,807.7166748046875,444],["Q",811.2166748046875,445,814.2166748046875,446.5],["Q",817.2166748046875,448,819.7166748046875,449.5],["Q",822.2166748046875,451,823.7166748046875,451.5],["Q",825.2166748046875,452,826.7166748046875,452.5],["L",828.2186748046875,453.002]]},{"type":"path","version":"5.2.1","originX":"left","originY":"top","left":150.21,"top":94,"width":539,"height":310,"fill":null,"stroke":"rgb(0, 0, 0)","strokeWidth":2,"strokeDashArray":null,"strokeLineCap":"round","strokeDashOffset":0,"strokeLineJoin":"round","strokeUniform":false,"strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"path":[["M",690.2186748046875,94.998],["Q",690.2166748046875,95,688.7166748046875,95],["Q",687.2166748046875,95,685.2166748046875,96],["Q",683.2166748046875,97,680.2166748046875,98],["Q",677.2166748046875,99,673.2166748046875,100.5],["Q",669.2166748046875,102,663.7166748046875,105],["Q",658.2166748046875,108,650.7166748046875,111.5],["Q",643.2166748046875,115,632.7166748046875,121],["Q",622.2166748046875,127,609.2166748046875,134],["Q",596.2166748046875,141,581.7166748046875,149],["Q",567.2166748046875,157,552.7166748046875,164.5],["Q",538.2166748046875,172,521.7166748046875,181.5],["Q",505.2166748046875,191,488.2166748046875,202],["Q",471.2166748046875,213,454.7166748046875,223.5],["Q",438.2166748046875,234,419.7166748046875,246.5],["Q",401.2166748046875,259,382.2166748046875,270.5],["Q",363.2166748046875,282,346.2166748046875,292],["Q",329.2166748046875,302,311.7166748046875,311.5],["Q",294.2166748046875,321,279.2166748046875,328.5],["Q",264.2166748046875,336,252.2166748046875,343],["Q",240.2166748046875,350,230.2166748046875,356],["Q",220.2166748046875,362,210.7166748046875,368],["Q",201.2166748046875,374,193.2166748046875,379],["Q",185.2166748046875,384,179.7166748046875,387.5],["Q",174.2166748046875,391,169.2166748046875,394],["Q",164.2166748046875,397,161.2166748046875,399],["Q",158.2166748046875,401,156.2166748046875,402],["Q",154.2166748046875,403,152.7166748046875,404],["L",151.2146748046875,405.002]]},{"type":"path","version":"5.2.1","originX":"left","originY":"top","left":93.22,"top":33.4,"width":718,"height":309.6,"fill":null,"stroke":"rgb(0, 0, 0)","strokeWidth":2,"strokeDashArray":null,"strokeLineCap":"round","strokeDashOffset":0,"strokeLineJoin":"round","strokeUniform":false,"strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"path":[["M",370.2186748046875,34.998],["Q",370.2166748046875,35,366.2166748046875,39.5],["Q",362.2166748046875,44,353.7166748046875,51.5],["Q",345.2166748046875,59,329.7166748046875,71.5],["Q",314.2166748046875,84,295.7166748046875,99.5],["Q",277.2166748046875,115,257.2166748046875,133],["Q",237.2166748046875,151,217.7166748046875,168.5],["Q",198.2166748046875,186,179.7166748046875,203],["Q",161.2166748046875,220,147.2166748046875,233],["Q",133.2166748046875,246,122.7166748046875,255.5],["Q",112.2166748046875,265,105.7166748046875,271.5],["Q",99.2166748046875,278,96.7166748046875,280],["Q",94.2166748046875,282,94.2166748046875,282.5],["Q",94.2166748046875,283,97.7166748046875,281.5],["Q",101.2166748046875,280,106.7166748046875,277],["Q",112.2166748046875,274,120.7166748046875,269.5],["Q",129.2166748046875,265,136.7166748046875,261],["Q",144.2166748046875,257,154.7166748046875,253],["Q",165.2166748046875,249,180.7166748046875,244],["Q",196.2166748046875,239,218.7166748046875,231.5],["Q",241.2166748046875,224,265.7166748046875,214.5],["Q",290.2166748046875,205,318.2166748046875,195],["Q",346.2166748046875,185,371.7166748046875,176.5],["Q",397.2166748046875,168,423.7166748046875,162],["Q",450.2166748046875,156,470.7166748046875,154],["Q",491.2166748046875,152,504.2166748046875,152],["Q",517.2166748046875,152,523.2166748046875,152],["Q",529.2166748046875,152,530.2166748046875,153.5],["Q",531.2166748046875,155,530.2166748046875,159],["Q",529.2166748046875,163,522.2166748046875,177.5],["Q",515.2166748046875,192,501.7166748046875,213],["Q",488.2166748046875,234,475.2166748046875,254.5],["Q",462.2166748046875,275,453.2166748046875,293],["Q",444.2166748046875,311,442.7166748046875,319.5],["Q",441.2166748046875,328,445.7166748046875,331],["Q",450.2166748046875,334,463.7166748046875,336.5],["Q",477.2166748046875,339,505.2166748046875,341.5],["Q",533.2166748046875,344,569.7166748046875,344],["Q",606.2166748046875,344,648.7166748046875,336.5],["Q",691.2166748046875,329,723.7166748046875,317.5],["Q",756.2166748046875,306,776.2166748046875,293.5],["Q",796.2166748046875,281,804.2166748046875,275],["Q",812.2166748046875,269,812.2166748046875,268.5],["Q",812.2166748046875,268,809.7166748046875,267.5],["Q",807.2166748046875,267,796.2166748046875,267],["Q",785.2166748046875,267,764.2166748046875,272.5],["Q",743.2166748046875,278,723.7166748046875,288],["Q",704.2166748046875,298,688.2166748046875,307.5],["Q",672.2166748046875,317,666.7166748046875,322],["Q",661.2166748046875,327,662.2166748046875,327],["Q",663.2166748046875,327,668.7166748046875,325],["Q",674.2166748046875,323,687.7166748046875,314],["Q",701.2166748046875,305,716.2166748046875,289],["Q",731.2166748046875,273,742.7166748046875,254],["Q",754.2166748046875,235,758.2166748046875,211],["Q",762.2166748046875,187,754.7166748046875,164],["Q",747.2166748046875,141,729.2166748046875,120.5],["Q",711.2166748046875,100,677.7166748046875,81.5],["Q",644.2166748046875,63,603.7166748046875,51],["Q",563.2166748046875,39,519.2166748046875,36],["Q",475.2166748046875,33,434.7166748046875,47],["Q",394.2166748046875,61,363.7166748046875,85],["Q",333.2166748046875,109,310.7166748046875,140.5],["Q",288.2166748046875,172,279.2166748046875,201.5],["Q",270.2166748046875,231,276.2166748046875,247.5],["Q",282.2166748046875,264,298.2166748046875,273],["Q",314.2166748046875,282,336.7166748046875,286.5],["Q",359.2166748046875,291,384.2166748046875,291.5],["Q",409.2166748046875,292,435.7166748046875,287],["Q",462.2166748046875,282,482.2166748046875,272.5],["Q",502.2166748046875,263,513.2166748046875,251],["Q",524.2166748046875,239,526.7166748046875,223.5],["Q",529.2166748046875,208,520.2166748046875,192.5],["Q",511.2166748046875,177,488.7166748046875,162.5],["Q",466.2166748046875,148,435.2166748046875,138],["Q",404.2166748046875,128,368.7166748046875,127],["Q",333.2166748046875,126,305.7166748046875,136.5],["Q",278.2166748046875,147,257.7166748046875,167.5],["Q",237.2166748046875,188,231.2166748046875,212],["Q",225.2166748046875,236,235.2166748046875,253],["Q",245.2166748046875,270,265.2166748046875,283],["Q",285.2166748046875,296,308.7166748046875,304],["Q",332.2166748046875,312,356.7166748046875,314],["Q",381.2166748046875,316,401.2166748046875,313.5],["Q",421.2166748046875,311,438.2166748046875,303],["Q",455.2166748046875,295,463.2166748046875,283],["Q",471.2166748046875,271,471.7166748046875,257.5],["Q",472.2166748046875,244,460.7166748046875,227.5],["Q",449.2166748046875,211,429.2166748046875,197],["Q",409.2166748046875,183,378.2166748046875,173],["Q",347.2166748046875,163,320.7166748046875,163.5],["Q",294.2166748046875,164,277.7166748046875,172.5],["Q",261.2166748046875,181,254.2166748046875,192],["Q",247.2166748046875,203,247.7166748046875,210.5],["Q",248.2166748046875,218,251.7166748046875,221.5],["Q",255.2166748046875,225,258.7166748046875,227.5],["Q",262.2166748046875,230,266.7166748046875,231.5],["Q",271.2166748046875,233,274.2166748046875,233],["Q",277.2166748046875,233,279.2166748046875,233],["Q",281.2166748046875,233,287.7166748046875,228.5],["L",294.2186748046875,223.998]]}]}'), function () {
            //     canvases.current[i].renderAll();
            // }, function (o, object) {
            //     console.log(o, object)
            // })
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