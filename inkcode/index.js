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

function getTouchOffset(el, touch) {
  const rect = el.getBoundingClientRect();
  return {
    x: touch.clientX - rect.left,
    y: touch.clientY - rect.top
  };
}

function handleMouseDown(e) {
    let target = e.currentTarget;
    //e.preventDefault();

    if (target.classList.contains('root')) {
        const clone = target.cloneNode(true);
        clone.classList.remove('root');
        target.parentNode.appendChild(clone);
        blocks.push(clone);
        clone.ontouchstart = handleMouseDown; // reattach event handler
        target = clone;
    }
    active = target;

    offset = getTouchOffset(active, e.touches[0]);

    offsetX = offset.x;
    offsetY = offset.y;
}

blocks.forEach(b => b.ontouchstart = handleMouseDown);

function get_pos(elem) {
    return new Vector(parseInt(elem.style.left), parseInt(elem.style.top))
}

function set_pos(elem, x, y) {
    elem.style.left = x + 'px';
    elem.style.top = y + 'px';
}

document.ontouchmove = e => {
    if (!active) return;
    //e.preventDefault();
    //e.preventDefault();
    //active.setPointerCapture(e.pointerId);
    set_pos(active, e.touches[0].clientX  - offsetX, e.touches[0].clientY - offsetY);

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

document.ontouchend = () => {
    //e.preventDefault();
    active = null;
}