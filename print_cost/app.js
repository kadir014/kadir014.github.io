(() => {
  function capitalizeFirstLetter(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  const KEY = "print-cost-calculator-v1";
  

const FILAMENT_TYPES = [
  "PLA", "PLA+", "PLA HS", "PLA Silk",
  "PETG", "PETG HF",
  "ABS", "ASA",
  "TPU", "TPU HS", "TPU 95A", "TPU 90A", "TPU 85A", "TPU 80A", "TPE",
  "PA", "PA-CF", "PC", "PVA", "HIPS",
  "Other"
];

  const defaults = { filaments: [], plates: [], settings: { laborRate: 0, electricRate: 3.24, powerUse: 100, packaging: 0, margin: 20 } };
  const COLOR_NAMES = { "siyah": "#000000", "beyaz": "#ffffff", "gri": "#808080", "kırmızı": "#ff0000", "bordo": "#800000", "koyu kırmızı": "#dc143c", "mercan": "#ff7f50", "turuncu": "#ffa500", "kehribar": "#ffbf00", "sarı": "#ffff00", "altın sarısı": "#ffd700", "zeytin yeşili": "#808000", "açık yeşil": "#00ff00", "yeşil": "#008000", "nane yeşili": "#98ff98", "koyu camgöbeği": "#008080", "turkuaz": "#40e0d0", "camgöbeği": "#00ffff", "lacivert": "#000080", "mavi": "#0000ff", "gökyüzü mavisi": "#87ceeb", "kraliyet mavisi": "#4169e1", "çivit mavisi": "#4b0082", "menekşe": "#8f00ff", "mor": "#800080", "lavanta": "#e6e6fa", "fuşya": "#ff00ff", "pembe": "#ffc0cb", "çingene pembesi": "#ff69b4", "kahverengi": "#a52a2a", "çikolata rengi": "#d2691e", "bej": "#f5f5dc", "krem": "#fffdd0", "fildişi": "#fffff0", "gümüş": "#c0c0c0", "koyu gri": "#36454f" };
  let state;
  try {
    const saved = JSON.parse(localStorage.getItem(KEY));
    state = { ...defaults, ...saved, settings: { ...defaults.settings, ...(saved?.settings || {}) } };
    if (!Array.isArray(state.filaments) || !Array.isArray(state.plates)) throw new Error("Invalid saved data");
  } catch { state = structuredClone(defaults); }

  const $ = (selector, root = document) => root.querySelector(selector);
  const money = value => `₺${new Intl.NumberFormat("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Number.isFinite(value) ? value : 0)}`;
  const persist = () => localStorage.setItem(KEY, JSON.stringify(state));
  const safe = value => String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  const colorFor = name => /^#[\da-f]{6}$/i.test(name) ? name : COLOR_NAMES[name.toLowerCase().trim()] || "#a5a296";
  const colorNameFor = hex => {
    const rgb = hex.match(/[\da-f]{2}/gi)?.map(part => parseInt(part, 16)) || [128, 128, 128];
    return Object.entries(COLOR_NAMES).reduce((best, [name, value]) => {
      const channels = value.match(/[\da-f]{2}/gi).map(part => parseInt(part, 16));
      const distance = channels.reduce((sum, channel, index) => sum + (channel - rgb[index]) ** 2, 0);
      return distance < best.distance ? { name, distance } : best;
    }, { name: "gray", distance: Infinity }).name;
  };
  const plateDuration = plate => (Number(plate.hours) || 0) + (Number(plate.minutes) || 0) / 60;
  const createPlate = () => ({ id: crypto.randomUUID(), hours: 0, minutes: 0, materials: [{ id: crypto.randomUUID(), filamentId: "", grams: 0 }] });

  const typeSelect = $("#filament-form [name=type]");
  typeSelect.innerHTML = FILAMENT_TYPES.map(type => `<option value="${safe(type)}">${safe(type)}</option>`).join("");
  const colorPicker = $("#filament-form [name=colorPicker]");
  const colorInput = $("#filament-form [name=color]");
  colorPicker.addEventListener("input", () => { colorInput.value = capitalizeFirstLetter(colorNameFor(colorPicker.value)); });
  colorInput.addEventListener("input", () => {
    const namedColor = COLOR_NAMES[colorInput.value.toLowerCase().trim()];
    if (namedColor) colorPicker.value = namedColor;
  });

  function renderFilaments() {
    const list = $("#filament-list");
    if (!state.filaments.length) { list.innerHTML = '<p class="empty">Henüz filament yok.</p>'; return; }
    list.innerHTML = state.filaments.map(f => `<div class="filament-item"><span class="swatch" style="background:${safe(f.swatch || colorFor(f.color))}"></span><div class="filament-info"><div class="filament-name">${safe(f.type)}${f.brand ? ` · ${safe(f.brand)}` : ""} · ${safe(f.color)}</div><div class="filament-meta">${money(f.price)} / kg</div></div><button class="icon-button" type="button" data-delete-filament="${f.id}" aria-label="${safe(f.type)} ${safe(f.brand || "")} ${safe(f.color)} filamentini kaldır">Kaldır</button></div>`).join("");
  }

  function renderPlates() {
    const list = $("#plate-list");
    if (!state.plates.length) { list.innerHTML = '<p class="empty">Henüz tabla eklenmedi. Tahmine başlamak için tabla ekleyin.</p>'; return; }
    list.innerHTML = state.plates.map((plate, index) => {
      const materialRows = plate.materials.map(material => {
        const selected = state.filaments.find(f => f.id === material.filamentId);
        return `<div class="material-row" data-material="${material.id}"><label>Filament<span class="filament-select"><i class="swatch material-swatch" style="background:${safe(selected?.swatch || "#e3e1db")}"></i><select data-field="filamentId"><option value="">Filament seçin</option>${state.filaments.map(f => `<option value="${f.id}" ${f.id === material.filamentId ? "selected" : ""}>${safe(f.type)}${f.brand ? ` · ${safe(f.brand)}` : ""} · ${safe(f.color)}</option>`).join("")}</select></span></label><label>Kullanılan<input data-field="grams" type="number" min="0" step="0.1" value="${safe(material.grams)}" placeholder="0"><small>gram</small></label><button class="icon-button" type="button" data-remove-material="${material.id}" aria-label="Malzeme satırını kaldır">×</button></div>`;
      }).join("");
      const cost = plate.materials.reduce((sum, m) => sum + (Number(m.grams) || 0) * (state.filaments.find(f => f.id === m.filamentId)?.price || 0) / 1000, 0);
      return `<article class="plate" data-plate="${plate.id}"><div class="plate-top"><span class="plate-title">Tabla ${index + 1}</span><button class="icon-button" type="button" data-remove-plate="${plate.id}">Tablayı kaldır</button></div><div class="plate-fields"><label>Baskı süresi</label><label>Saat<input data-field="hours" type="number" min="0" step="1" value="${safe(plate.hours)}"></label><label>Dakika<input data-field="minutes" type="number" min="0" max="59" step="1" value="${safe(plate.minutes)}"></label></div><div class="material-rows">${materialRows}</div><div class="plate-bottom"><button class="add-material" type="button" data-add-material="${plate.id}">+ Malzeme ekle</button><span class="plate-cost">Malzeme ${money(cost)}</span></div></article>`;
    }).join("");
  }

  function calculate() {
    const grams = state.plates.reduce((sum, p) => sum + p.materials.reduce((s, m) => s + (Number(m.grams) || 0), 0), 0);
    const material = state.plates.reduce((sum, p) => sum + p.materials.reduce((s, m) => s + (Number(m.grams) || 0) * (state.filaments.find(f => f.id === m.filamentId)?.price || 0) / 1000, 0), 0);
    const hours = state.plates.reduce((sum, p) => sum + plateDuration(p), 0);
    const labor = hours * (Number(state.settings.laborRate) || 0);
    const electricity = hours * (Number(state.settings.powerUse) || 0) / 1000 * (Number(state.settings.electricRate) || 0);
    const packaging = Number(state.settings.packaging) || 0;
    const subtotal = material + labor + electricity + packaging;
    const margin = subtotal * (Number(state.settings.margin) || 0) / 100;
    const total = subtotal + margin;
    $("#total-price").textContent = money(total);
    const number = value => new Intl.NumberFormat("tr-TR", { minimumFractionDigits: 1, maximumFractionDigits: 2 }).format(value);
    const rows = [[`Filament · ${number(grams)} g`, material], [`İşçilik · ${number(hours)} sa`, labor], ["Elektrik", electricity], ["Ambalaj / Kargo", packaging], ["Marj öncesi maliyet", subtotal, "total-cost"], [`Kâr marjı · ${number(Number(state.settings.margin) || 0)}%`, margin]];
    $("#breakdown").innerHTML = rows.map(([label, value, klass = ""]) => `<div class="breakdown-row ${klass}"><span>${label}</span><strong>${money(value)}</strong></div>`).join("") + `<div class="breakdown-row total-cost"><span>Önerilen fiyat</span><strong>${money(total)}</strong></div>`;
  }

  function render() { renderFilaments(); renderPlates(); calculate(); persist(); }
  const form = $("#filament-form");
  form.addEventListener("submit", event => {
    event.preventDefault();
    const data = new FormData(form);
    const color = data.get("color").trim();
    state.filaments.push({ id: crypto.randomUUID(), type: data.get("type").trim(), brand: data.get("brand").trim(), color, price: Math.max(0, Number(data.get("price")) || 0), swatch: COLOR_NAMES[color.toLowerCase()] || colorPicker.value });
    form.reset(); colorPicker.value = "#808080"; colorInput.value = "gray"; render();
  });
  $("#add-plate").addEventListener("click", () => { state.plates.push(createPlate()); render(); });
  document.addEventListener("click", event => {
    const target = event.target;
    if (target.matches("[data-delete-filament]")) {
      const id = target.dataset.deleteFilament;
      state.filaments = state.filaments.filter(f => f.id !== id);
      state.plates.forEach(p => p.materials.forEach(m => { if (m.filamentId === id) m.filamentId = ""; })); render();
    }
    if (target.matches("[data-remove-plate]")) { state.plates = state.plates.filter(p => p.id !== target.dataset.removePlate); render(); }
    if (target.matches("[data-add-material]")) { state.plates.find(p => p.id === target.dataset.addMaterial)?.materials.push({ id: crypto.randomUUID(), filamentId: "", grams: 0 }); render(); }
    if (target.matches("[data-remove-material]")) {
      const row = target.closest("[data-material]"), plate = target.closest("[data-plate]");
      const p = state.plates.find(item => item.id === plate.dataset.plate);
      if (p.materials.length > 1) p.materials = p.materials.filter(m => m.id !== row.dataset.material);
      render();
    }
  });
  document.addEventListener("input", event => updateFromField(event.target));
  document.addEventListener("change", event => updateFromField(event.target));
  function updateFromField(input) {
    if (!input.matches("[data-field]")) return;
    const plate = input.closest("[data-plate]"), row = input.closest("[data-material]");
    if (!plate) return;
    const p = state.plates.find(item => item.id === plate.dataset.plate);
    if (row) {
      const material = p.materials.find(item => item.id === row.dataset.material);
      material[input.dataset.field] = input.dataset.field === "grams" ? Math.max(0, Number(input.value) || 0) : input.value;
      if (input.dataset.field === "filamentId") {
        const selected = state.filaments.find(f => f.id === input.value);
        $(".material-swatch", row).style.background = selected?.swatch || "#e3e1db";
      }
    } else p[input.dataset.field] = Math.max(0, Number(input.value) || 0);
    persist();
    const plateCost = p.materials.reduce((sum, m) => sum + (Number(m.grams) || 0) * (state.filaments.find(f => f.id === m.filamentId)?.price || 0) / 1000, 0);
    $(".plate-cost", plate).textContent = `Malzeme ${money(plateCost)}`;
    calculate();
  }
  for (const [field, id] of Object.entries({ laborRate: "labor-rate", electricRate: "electric-rate", powerUse: "power-use", packaging: "packaging", margin: "margin" })) {
    const input = $("#" + id); input.value = state.settings[field];
    input.addEventListener("input", () => { state.settings[field] = Math.max(0, Number(input.value) || 0); persist(); calculate(); });
  }
  render();
})();
