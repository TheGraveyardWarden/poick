class ProgressBar {
    constructor(from, to, step, root) {
        this.from = String(from);
        this.to = String(to);
        this.step = String(step);
        this.root = root;
        this.dragging = false;
        this.circle = undefined;

        this.con = document.createElement('div');
        this.con.classList.add('progressBarCon');
        
        this.createLabels();
        this.createCircle();
        
        this.root.appendChild(this.labelFrom);
        this.root.appendChild(this.con);
        this.root.appendChild(this.labelTo);
    }

    createCircle() {
        this.circle = document.createElement('div');
        this.circle.classList.add('FUPCircle');
        this.circle.draggable = true;

        this.circle.addEventListener('mousedown', this.dragstart.bind(this));
        window.addEventListener('mousemove', this.drag.bind(this));
        window.addEventListener('mouseup', this.dragend.bind(this));

        this.con.appendChild(this.circle);
    }

    createLabels() {
        this.labelFrom = document.createElement('div');
        this.labelTo = document.createElement('div');
        this.labelFrom.innerHTML = String(parseFloat(this.from).toFixed(this.step)).toPersian();
        this.labelTo.innerHTML = this.to.toPersian();
        this.labelFrom.classList.add('FUPLabel');
        this.labelTo.classList.add('FUPLabel');
    }

    dragstart(e) {
        e.preventDefault();
        this.dragging = true;
    }

    drag(e) {
        if (!this.dragging) return;
        let move = e.pageX - getTotalOffsetLeft(this.con) - 7.5;
        if (move < 0) return this.setCircle(0);
        if (move > this.con.clientWidth - 15) return this.setCircle(this.con.clientWidth - 15);
        this.setCircle(move);
    }
    
    dragend() {
        this.dragging = false;
    }

    setCircle(n) {
        this.circle.style.left = `${n}px`;
        let percent = n*100/(this.con.clientWidth-15);
        let val_per = Math.abs(percent-100);
        let v = convertRange(val_per, 0, 100, Number(this.from), Number(this.to));
        this.setValue(v);
        this.con.style.background = `radial-gradient(circle at ${percent}% ,#00bbff 0%, #0088ff 100%)`;
    }

    setValue(n) {
        this.labelFrom.innerText = String(n.toFixed(this.step)).toPersian();
    }
}

function getTotalOffsetLeft(element) {
    let offsetLeft = 0;
    
    while (element) {
        offsetLeft += element.offsetLeft;
        element = element.offsetParent;
    }
    
    return offsetLeft;
}

function convertRange(number, oldMin, oldMax, newMin, newMax) {
    // First, normalize the number from the old range (0-100) to a 0-1 range
    const normalizedNumber = (number - oldMin) / (oldMax - oldMin);

    // Then, apply the range conversion formula to get the new value in the desired range (a-b)
    const newValue = (normalizedNumber * (newMax - newMin)) + newMin;

    return newValue;
}

let p = new ProgressBar(0, 5, 1, document.querySelector('#FUProgressBar'));
