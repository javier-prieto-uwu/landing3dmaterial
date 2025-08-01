document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar todos los elementos del DOM
    const inputs = {
        materialPrice: document.getElementById('material-price'),
        materialTotal: document.getElementById('material-total'),
        materialUsed: document.getElementById('material-used'),
        workHours: document.getElementById('work-hours'),
        hourCost: document.getElementById('hour-cost'),
        electricCost: document.getElementById('electric-cost'),
        otherCosts: document.getElementById('other-costs'),
        profitMargin: document.getElementById('profit-margin'),
    };

    const outputs = {
        summaryMaterial: document.getElementById('summary-material'),
        summaryLabor: document.getElementById('summary-labor'),
        summaryOthers: document.getElementById('summary-others'),
        summaryProduction: document.getElementById('summary-production'),
        summarySale: document.getElementById('summary-sale'),
    };

    const clearBtn = document.getElementById('clear-btn');

    // Función principal para calcular todo
    function calculateCosts() {
        // Obtener valores y convertirlos a números, con 0 como default
        const materialPrice = parseFloat(inputs.materialPrice.value) || 0;
        const materialTotal = parseFloat(inputs.materialTotal.value) || 0;
        const materialUsed = parseFloat(inputs.materialUsed.value) || 0;
        const workHours = parseFloat(inputs.workHours.value) || 0;
        const hourCost = parseFloat(inputs.hourCost.value) || 0;
        const electricCost = parseFloat(inputs.electricCost.value) || 0;
        const otherCosts = parseFloat(inputs.otherCosts.value) || 0;
        const profitMargin = parseFloat(inputs.profitMargin.value) || 0;

        // Calcular costos parciales
        let materialCost = 0;
        if (materialTotal > 0) {
            materialCost = (materialPrice / materialTotal) * materialUsed;
        }
        const laborCost = workHours * hourCost;
        const othersTotalCost = electricCost + otherCosts;

        // Calcular totales
        const productionCost = materialCost + laborCost + othersTotalCost;
        const salePrice = productionCost * (1 + profitMargin / 100);

        // Actualizar la interfaz de resultados
        outputs.summaryMaterial.textContent = `$${materialCost.toFixed(2)}`;
        outputs.summaryLabor.textContent = `$${laborCost.toFixed(2)}`;
        outputs.summaryOthers.textContent = `$${othersTotalCost.toFixed(2)}`;
        outputs.summaryProduction.textContent = `$${productionCost.toFixed(2)}`;
        outputs.summarySale.textContent = `$${salePrice.toFixed(2)}`;
    }

    // Función para limpiar todos los campos
    function clearAll() {
        for (const key in inputs) {
            if (key !== 'profitMargin') { // No limpiar el margen de ganancia
                inputs[key].value = '';
            }
        }
        calculateCosts(); // Recalcular para que todo vuelva a cero
    }

    // Añadir listeners a todos los inputs para que se actualice en tiempo real
    for (const key in inputs) {
        inputs[key].addEventListener('input', calculateCosts);
    }

    // Listener para el botón de limpiar
    clearBtn.addEventListener('click', clearAll);

    // Calcular una vez al cargar la página
    calculateCosts();
});
