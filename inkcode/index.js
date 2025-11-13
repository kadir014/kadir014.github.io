class Vector extends Array {
    add(other) {
        return new Vector(this[0] + other[0], this[1] + other[1]);
    }

    sub(other) {
        return new Vector(this[0] - other[0], this[1] - other[1]);
    }

    lensq() {
        return this[0] * this[0] + this[1] * this[1];
    }

    len() {
        return Math.sqrt(this.lensq());
    }

    dist(other) {
        let delta = this.sub(other);
        return delta.len();
    }
}


blocks = Array.from(document.querySelectorAll(".block"));
let active = null, offsetX, offsetY;

function handleMouseDown(e) {
    b = e.currentTarget;

    if (b.classList.contains('root')) {
        const clone = b.cloneNode(true);
        clone.classList.remove('root');
        b.parentNode.appendChild(clone);
        blocks.push(clone);
        clone.onpointerdown = handleMouseDown; // reattach event handler
        b = clone;
    }

    active = b;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
}

blocks.forEach(b => b.onpointerdown = handleMouseDown);

function get_pos(elem) {
    return new Vector(parseInt(elem.style.left), parseInt(elem.style.top))
}

function set_pos(elem, x, y) {
    elem.style.left = x + 'px';
    elem.style.top = y + 'px';
}

document.onpointermove = e => {
    if (!active) return;
    e.preventDefault();
    active.setPointerCapture(e.pointerId);
    set_pos(active, e.clientX - offsetX, e.clientY - offsetY);

    blocks.forEach(b => {
        //active_pos = get_pos(active);
        //b_pos = get_pos(b);
        active_rect = active.getBoundingClientRect();
        b_rect = b.getBoundingClientRect();
        active_pos = get_pos(active);

        right_snap = new Vector(
            b_rect.right,
            b_rect.top
        );

        left_snap = new Vector(
            b_rect.left - b_rect.width,
            b_rect.top
        );

        down_snap = new Vector(
            b_rect.left,
            b_rect.top + b_rect.height
        );

        up_snap = new Vector(
            b_rect.left,
            b_rect.top - b_rect.height
        );
        
        dist = active_pos.dist(right_snap);
        if (dist < 15.0) {
            set_pos(active, right_snap[0], right_snap[1]);
        }

        dist = active_pos.dist(left_snap);
        if (dist < 15.0) {
            set_pos(active, left_snap[0], left_snap[1]);
        }

        dist = active_pos.dist(down_snap);
        if (dist < 15.0) {
            set_pos(active, down_snap[0], down_snap[1]);
        }

        dist = active_pos.dist(up_snap);
        if (dist < 15.0) {
            set_pos(active, up_snap[0], up_snap[1]);
        }
    })
};

document.onpointerup = () => active = null;