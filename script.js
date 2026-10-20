
"use strict";

const STORAGE_KEY = "camshield_mono_v2";

const profiles = {
    home: {
        title: "Painel residencial",
        description: "Organize suas câmeras e dispositivos domésticos."
    },
    business: {
        title: "Painel empresarial",
        description: "Gerencie os equipamentos do seu estabelecimento."
    },
    installer: {
        title: "Painel profissional",
        description: "Organize equipamentos e registros para seus clientes."
    },
    it: {
        title: "Painel técnico",
        description: "Centralize inventários e checklists de dispositivos."
    }
};

const types = {
    camera: "Câmera de segurança",
    router: "Roteador",
    lock: "Fechadura inteligente",
    tv: "Smart TV",
    other: "Dispositivo IoT"
};

const questions = [
    "A senha padrão foi alterada?",
    "A versão do firmware foi conferida manualmente?",
    "As permissões de acesso foram revisadas?",
    "O acesso remoto foi configurado de forma segura?",
    "As recomendações do fabricante foram consultadas?"
];

const tips = [
    ["Senhas fortes", "Evite senhas padrão ou reutilizadas."],
    ["Atualizações", "Consulte o fabricante para conferir o firmware."],
    ["Acesso remoto", "Desative serviços desnecessários."],
    ["Rede separada", "Considere uma rede exclusiva para dispositivos IoT."]
];

function loadData() {
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));

        if (
            saved &&
            Array.isArray(saved.devices) &&
            saved.checklists &&
            typeof saved.checklists === "object"
        ) {
            return saved;
        }
    } catch (error) {
        console.warn("Erro ao carregar dados:", error);
    }

    return {
        profile: "home",
        devices: [],
        checklists: {}
    };
}

let state = loadData();

if (!profiles[state.profile]) {
    state.profile = "home";
}

function saveData() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
        console.error(error);
        alert("Não foi possível salvar os dados neste navegador.");
    }
}

function $(id) {
    return document.getElementById(id);
}

function element(tag, content, className) {
    const node = document.createElement(tag);

    if (content !== undefined) {
        node.textContent = content;
    }

    if (className) {
        node.className = className;
    }

    return node;
}

// RELÓGIO

function updateClock() {
    $("clock").textContent = new Date().toLocaleTimeString("pt-BR");
}

updateClock();
setInterval(updateClock, 1000);

// NAVEGAÇÃO

const pageNames = {
    dashboard: "Visão geral",
    monitor: "Monitoramento",
    devices: "Dispositivos",
    checklist: "Checklist",
    reports: "Relatórios"
};

function showPage(page) {
    if (!pageNames[page]) return;

    document.querySelectorAll(".page").forEach(section => {
        section.classList.toggle("active", section.id === page);
    });

    document.querySelectorAll(".nav-item").forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.page === page
        );
    });

    $("pageTitle").textContent = pageNames[page];
    $("breadcrumb").textContent = pageNames[page].toUpperCase();

    if (page === "reports") renderReport();

    window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll("[data-page]").forEach(button => {
    button.addEventListener("click", () => {
        showPage(button.dataset.page);
    });
});

document.querySelectorAll("[data-go]").forEach(button => {
    button.addEventListener("click", () => {
        showPage(button.dataset.go);
    });
});

// PERFIS

$("profileSelect").value = state.profile;

$("profileSelect").addEventListener("change", event => {
    state.profile = event.target.value;
    saveData();
    renderDashboard();
});

// DASHBOARD

function renderDashboard() {
    const profile = profiles[state.profile];

    $("welcomeTitle").textContent = profile.title;
    $("welcomeText").textContent = profile.description;

    $("statDevices").textContent = state.devices.length;

    $("statCameras").textContent = state.devices.filter(
        device => device.type === "camera"
    ).length;

    $("statChecks").textContent = Object.keys(state.checklists).filter(
        id => state.devices.some(device => device.id === id)
    ).length;

    $("statTips").textContent = tips.length;

    const container = $("tipsList");
    container.replaceChildren();

    tips.forEach((tip, index) => {
        const row = element("div", undefined, "tip-item");

        const number = element(
            "div",
            String(index + 1).padStart(2, "0"),
            "tip-number"
        );

        const content = element("div");
        content.appendChild(element("strong", tip[0]));
        content.appendChild(element("p", tip[1]));

        row.append(number, content);
        container.appendChild(row);
    });
}

// CÂMERAS DEMONSTRATIVAS

function createCameraScreen(device, index) {
    const screen = element("div", undefined, "camera-screen");

    const label = element(
        "div",
        device ? device.name : "CANAL DISPONÍVEL",
        "camera-label"
    );

    const center = element("div", undefined, "camera-center");

    center.appendChild(
        element("div", "▣", "camera-symbol")
    );

    center.appendChild(
        element("small", "SEM TRANSMISSÃO · DEMO")
    );

    const channel = element(
        "div",
        "CH " + String(index + 1).padStart(2, "0"),
        "camera-channel"
    );

    const status = element(
        "div",
        device ? "CÂMERA CADASTRADA" : "NÃO CONFIGURADO",
        "camera-status"
    );

    screen.append(label, center, channel, status);

    return screen;
}

function renderCameras() {
    const cameras = state.devices.filter(
        device => device.type === "camera"
    );

    const dashboard = $("dashboardCameras");
    const monitor = $("monitorCameras");

    dashboard.replaceChildren();
    monitor.replaceChildren();

    // A prévia sempre possui quatro canais.
    for (let i = 0; i < 4; i++) {
        dashboard.appendChild(
            createCameraScreen(cameras[i] || null, i)
        );
    }

    // A central mostra todas as câmeras cadastradas,
    // com no mínimo quatro canais.
    const totalChannels = Math.max(4, cameras.length);

    for (let i = 0; i < totalChannels; i++) {
        monitor.appendChild(
            createCameraScreen(cameras[i] || null, i)
        );
    }

    $("monitorCount").textContent =
        `${cameras.length} CÂMERA(S) CADASTRADA(S)`;
}

// CADASTRO DE DISPOSITIVOS

const modal = $("deviceModal");

$("openModal").addEventListener("click", () => {
    modal.showModal();
});

$("closeModal").addEventListener("click", () => {
    modal.close();
});

$("cancelModal").addEventListener("click", () => {
    modal.close();
});

$("deviceForm").addEventListener("submit", event => {
    event.preventDefault();

    const name = $("deviceName").value.trim();
    const brand = $("deviceBrand").value.trim();

    if (!name || !brand) return;

    const device = {
        id: crypto.randomUUID(),
        name,
        brand,
        type: $("deviceType").value,
        firmware: $("deviceFirmware").value.trim()
    };

    state.devices.push(device);
    saveData();

    event.target.reset();
    modal.close();

    renderAll();
});

function renderDevices() {
    const table = $("deviceTable");
    table.replaceChildren();

    $("emptyDevices").hidden = state.devices.length > 0;

    state.devices.forEach(device => {
        const row = document.createElement("tr");

        const values = [
            device.name,
            types[device.type] || "Outro",
            device.brand,
            device.firmware || "Não informado"
        ];

        values.forEach((value, index) => {
            const cell = element("td", value);

            if (index === 0) {
                cell.className = "device-name";
            }

            row.appendChild(cell);
        });

        const actionCell = document.createElement("td");
        const button = element("button", "Excluir", "delete-btn");

        button.addEventListener("click", () => {
            if (!confirm(`Excluir "${device.name}"?`)) return;

            state.devices = state.devices.filter(
                item => item.id !== device.id
            );

            delete state.checklists[device.id];

            saveData();
            renderAll();
        });

        actionCell.appendChild(button);
        row.appendChild(actionCell);
        table.appendChild(row);
    });
}

// SELETORES DE DISPOSITIVOS

function populateSelect(id) {
    const select = $(id);
    const previousValue = select.value;

    select.replaceChildren();

    if (state.devices.length === 0) {
        select.add(new Option("Nenhum dispositivo cadastrado", ""));
        select.disabled = true;
        return;
    }

    select.disabled = false;

    state.devices.forEach(device => {
        select.add(new Option(device.name, device.id));
    });

    if (state.devices.some(device => device.id === previousValue)) {
        select.value = previousValue;
    }
}

// CHECKLIST MANUAL

function renderChecklist() {
    const id = $("checkDevice").value;
    const container = $("checklistItems");

    container.replaceChildren();
    $("checkMessage").textContent = "";

    if (!id) {
        container.appendChild(
            element("p", "Cadastre um dispositivo primeiro.")
        );
        return;
    }

    const saved = state.checklists[id] || [];

    questions.forEach((question, index) => {
        const row = element("div", undefined, "check-item");

        const input = document.createElement("input");
        input.type = "checkbox";
        input.id = `check-${index}`;
        input.value = index;
        input.checked = saved.includes(index);

        const label = document.createElement("label");
        label.htmlFor = input.id;
        label.textContent = question;

        row.append(input, label);
        container.appendChild(row);
    });
}

$("checkDevice").addEventListener("change", renderChecklist);

$("saveChecklist").addEventListener("click", () => {
    const id = $("checkDevice").value;

    if (!id) {
        alert("Cadastre um dispositivo primeiro.");
        return;
    }

    const checked = Array.from(
        document.querySelectorAll("#checklistItems input:checked")
    ).map(input => Number(input.value));

    state.checklists[id] = checked;

    saveData();
    renderDashboard();

    $("checkMessage").textContent =
        "Checklist manual salvo com sucesso.";
});

// RELATÓRIOS

function renderReport() {
    const id = $("reportDevice").value;
    const container = $("reportContent");

    container.replaceChildren();

    const device = state.devices.find(item => item.id === id);

    if (!device) {
        container.appendChild(
            element("p", "Cadastre um dispositivo para gerar o relatório.")
        );
        return;
    }

    container.appendChild(
        element("h3", "CAMSHIELD — RELATÓRIO DEMONSTRATIVO")
    );

    const fields = [
        ["Equipamento", device.name],
        ["Tipo", types[device.type] || "Outro"],
        ["Fabricante", device.brand],
        ["Firmware informado", device.firmware || "Não informado"],
        ["Data", new Date().toLocaleDateString("pt-BR")]
    ];

    fields.forEach(([label, value]) => {
        const paragraph = document.createElement("p");
        const strong = element("strong", `${label}: `);

        paragraph.append(strong, document.createTextNode(value));
        container.appendChild(paragraph);
    });

    const warning = element(
        "p",
        "Este relatório contém dados informados manualmente. " +
        "Não comprova que o equipamento está seguro ou atualizado.",
        "report-warning"
    );

    container.appendChild(warning);
    container.appendChild(element("h4", "Checklist de segurança"));

    const list = document.createElement("ul");
    const saved = state.checklists[id];

    questions.forEach((question, index) => {
        let status = "Não verificado";

        if (saved) {
            status = saved.includes(index)
                ? "Confirmado manualmente"
                : "Não confirmado";
        }

        list.appendChild(
            element("li", `${question} — ${status}`)
        );
    });

    container.appendChild(list);
}

$("reportDevice").addEventListener("change", renderReport);

$("printReport").addEventListener("click", () => {
    if (state.devices.length === 0) {
        alert("Cadastre um dispositivo primeiro.");
        return;
    }

    renderReport();
    window.print();
});

// ATUALIZAÇÃO GERAL

function renderAll() {
    populateSelect("checkDevice");
    populateSelect("reportDevice");

    renderDashboard();
    renderCameras();
    renderDevices();
    renderChecklist();
    renderReport();
}

renderAll();
