import React, { useState } from "react";
import './Work.css';

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
        ]
    }
}

// function getScrollHeight() {
//     return document.getElementById("img-layer").scrollHeight;
// }

function drawingCanvas() {
    console.log("Canvas layer Clicked");
}

function objectClicked() {
    console.log("Object Clicked");
}

export default function Work(props) {

    const symbol = {
        WRONG: 'wrong',
        RIGHT: 'right',
        WRONG_IMG: "img/wrong1.png",
        RIGHT_IMG: "img/right1.png",
    }

    const [objects, setObjects] = useState([]);
    let a =1;
    const [objectSpans, setObjectSpans] = useState();
    // var objectSpans = objects.map((object, index) => 
    //     <span className="object-symbol-container" style={{left:object.left, top:object.top}}>
    //         <img className="object-symbol object" src="img/right1.png" />
    //     </span>
    //     )

    const tools = {
        SYMBOL: "SYMBOL",
        PEN: "PEN",
        COMMENT: "COMMENT"
    }

    var gradingTool = tools.SYMBOL;
    const work = callGetWork()
    console.log("asd" + props.assignment.id);
    const listSubmitted = work.works.map((submit, index) =>
        <img id={"work-img-" + index} index={index} src={submit} onClick={(e) => imageClicked(e, index)}/>
    )
    function imageClicked(e, i) {
        console.log("Image layer Clicked height" + i);
        var rect = e.target.getBoundingClientRect();
        console.log("rect: " + rect.top + " " + rect.left)
        var x = e.clientX - rect.left; //x position within the element.
        var y = e.clientY - rect.top;  //y position within the element.
        console.log("Left? : " + x + " ; Top? : " + y + ".");
        objects.push({left: x-30, top: y-30, image:i})
        setObjects(objects)
        console.log(objects)
        setObjectSpans(objects.map((object, index) => {
            var imgHeight = 0
            for (let i = 0; i < object.image; i++) {
                imgHeight += document.getElementById('work-img-' + i).clientHeight
            }
            return (
            <span className="object-symbol-container" style={{left:object.left, top:(object.top + imgHeight)}}>
                <img className="object-symbol object" src={symbol.RIGHT_IMG} />
            </span>
            )
        }
        ))
    }
    function toolCommentClicked() {
        console.log("Tool comment Clicked" + this.gradingTool);
        this.gradingTool = this.tools.COMMENT
    }

    function toolPenClicked() {
        console.log("Tool Pen Clicked" + this.gradingTool);
        return this.gradingTool = this.tools.PEN
    }

    function toolSymbolClicked() {
        console.log("Tool Symbol Clicked" + this.gradingTool);
        this.gradingTool = this.tools.SYMBOL
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
                    </div>
                </div>
                <div className="col-7">
                    <div className="img-layer layer" id="img-layer" onClick={drawingCanvas}>
                        {listSubmitted}
                    </div>
                    {/* <div className="drawing-layer layer" id="drawing-layer" style={{ height: 2301 }}
                        onClick={drawingCanvas}>
                        <canvas id="my-canvas" className="my-canvas" />
                    </div> */}
                    <div className="object-layer layer" id="object-layer" 
                    // style={{ height: 2301 }}
                        onClick={objectLayerClicked}>
                        <span className="object-symbol-container">
                            <img className="object-symbol object" src="img/right1.png" />
                        </span>
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