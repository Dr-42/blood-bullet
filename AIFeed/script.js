document.addEventListener('DOMContentLoaded', () => {
    // --- ELEMENT SELECTORS ---
    const root = document.documentElement;
    const pages = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('.nav-item[data-page]');

    // Modals
    const settingsBtn = document.getElementById('settings-btn');
    const settingsModal = document.getElementById('settings-modal');
    const settingsCloseBtn = settingsModal.querySelector('.close-button');

    const licenseBtn = document.getElementById('license-btn');
    const licenseModal = document.getElementById('license-modal');
    const licenseCloseBtn = licenseModal.querySelector('.close-button');

    // Theme Elements
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const themeBtns = document.querySelectorAll('.theme-btn');
    const previewBox = document.querySelector('.theme-preview-box');

    // --- THEME DATA ---
    const themes = { /* ... existing theme data ... */ };

    // --- MODAL & PAGE LOGIC ---
    settingsBtn.addEventListener('click', (e) => { e.preventDefault(); settingsModal.style.display = 'block'; });
    settingsCloseBtn.addEventListener('click', () => { settingsModal.style.display = 'none'; });
    licenseBtn.addEventListener('click', (e) => { e.preventDefault(); licenseModal.style.display = 'block'; });
    licenseCloseBtn.addEventListener('click', () => { licenseModal.style.display = 'none'; });
    window.addEventListener('click', (event) => { if (event.target == settingsModal) settingsModal.style.display = 'none'; if (event.target == licenseModal) licenseModal.style.display = 'none'; });
    navLinks.forEach(link => { link.addEventListener('click', (e) => { e.preventDefault(); const pageId = link.dataset.page + '-page'; const targetPage = document.getElementById(pageId); if (targetPage) { pages.forEach(page => page.classList.remove('active')); targetPage.classList.add('active'); } }); });

    // --- THEME AND MODE SWITCHING ---
    // ... existing theme logic ...

    const convertDateFormat = (dateString) => { if (!dateString) return ''; const [year, month, day] = dateString.split('-'); return `${day}-${month}-${year}`; };

    // --- DLC COUNTER SETUP FUNCTION ---
    // ... existing setupDlcCounter function ...

    // --- ROUTINE SLIDE FORM ---
    const routineSlideForm = document.getElementById('routine-slide-form');
    if (routineSlideForm) {
        setupDlcCounter('');
        // ... existing routine form submit logic ...
    }

    // --- SPECIAL STUDIES FORM ---
    const specialStudiesForm = document.getElementById('special-studies-form');
    if (specialStudiesForm) {
        setupDlcCounter('ss-');

        const testRequestedContainer = document.getElementById('ss-test-requested');
        const specialStudiesContainer = document.getElementById('ss-special-studies-container');
        const addInvestigationBtn = document.getElementById('ss-add-investigation-btn');
        const investigationsContainer = document.getElementById('ss-investigations-container');

        const specialStudiesTemplates = {
            iron: `<fieldset id="study-section-iron"><legend>Iron Studies</legend><div class="form-grid-4-col"><div class="form-group"><label>Serum Iron</label><input type="number" name="iron_serum"></div><div class="form-group"><label>TIBC</label><input type="number" name="iron_tibc"></div><div class="form-group"><label>TS%</label><input type="number" name="iron_ts"></div><div class="form-group"><label>Ferritin</label><input type="number" name="iron_ferritin"></div></div></fieldset>`,
            hplc: `<fieldset id="study-section-hplc"><legend>HPLC</legend><div id="ss-hplc-peaks-container"><div class="form-grid-2-col"><div class="form-group"><label>HbA0</label><input type="number" step="0.01" name="hplc_hba0"></div><div class="form-group"><label>HbA2</label><input type="number" step="0.01" name="hplc_hba2"></div></div></div><button type="button" id="ss-add-hplc-btn" class="button-primary">Add Peak</button></fieldset>`,
            lap: `<fieldset id="study-section-lap"><legend>LAP Score</legend><div class="form-group"><label>Score</label><input type="number" name="lap_score"></div></fieldset>`,
            stains: `<fieldset id="study-section-stains"><legend>Special Stains</legend><div id="ss-stains-container"><div class="form-grid-2-col"><div class="form-group"><label>MPO</label><input type="text" name="stain_mpo"></div><div class="form-group"><label>SB</label><input type="text" name="stain_sb"></div></div></div><button type="button" id="ss-add-stain-btn" class="button-primary">Add Stain</button></fieldset>`,
            spep: `<fieldset id="study-section-spep"><legend>SPEP</legend><div class="form-group"><textarea name="spep_notes" rows="4"></textarea></div></fieldset>`,
            'hb-electro': `<fieldset id="study-section-hb-electro"><legend>Hb Electrophoresis</legend><div class="form-group"><textarea name="hbelectro_notes" rows="4"></textarea></div></fieldset>`
        };
        const hplcPeakTemplate = `<div class="form-grid-2-col"><div class="form-group"><input type="text" name="hplc_peak_name[]" placeholder="Peak Name"></div><div class="form-group"><input type="number" step="0.01" name="hplc_peak_value[]" placeholder="Value"></div></div>`;
        const stainTemplate = `<div class="form-grid-2-col"><div class="form-group"><input type="text" name="stain_name[]" placeholder="Stain Name"></div><div class="form-group"><input type="text" name="stain_result[]" placeholder="Result"></div></div>`;
        const investigationSetTemplate = `<fieldset class="investigation-set"><legend>Investigation Set</legend><div class="form-grid-4-col"><div class="form-group"><label>Date</label><input type="date" name="inv_date[]"></div><div class="form-group"><label>Hb</label><input type="number" name="inv_hb[]"></div><div class="form-group"><label>TLC</label><input type="number" name="inv_tlc[]"></div><div class="form-group"><label>PLT</label><input type="number" name="inv_plt[]"></div><div class="form-group"><label>RBC</label><input type="number" name="inv_rbc[]"></div><div class="form-group"><label>MCV</label><input type="number" name="inv_mcv[]"></div><div class="form-group"><label>MCH</label><input type="number" name="inv_mch[]"></div><div class="form-group"><label>MCHC</label><input type="number" name="inv_mchc[]"></div><div class="form-group"><label>BU</label><input type="number" name="inv_bu[]"></div><div class="form-group"><label>Creat</label><input type="number" name="inv_creat[]"></div><div class="form-group"><label>Na+</label><input type="number" name="inv_na[]"></div><div class="form-group"><label>K+</label><input type="number" name="inv_k[]"></div><div class="form-group"><label>SGOT</label><input type="number" name="inv_sgot[]"></div><div class="form-group"><label>SGPT</label><input type="number" name="inv_sgpt[]"></div><div class="form-group"><label>ALP</label><input type="number" name="inv_alp[]"></div><div class="form-group"><label>D.Bil</label><input type="number" name="inv_dbil[]"></div><div class="form-group"><label>T.Bil</label><input type="number" name="inv_tbil[]"></div></div></fieldset>`;

        testRequestedContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('pill-btn')) {
                const btn = e.target;
                const study = btn.dataset.value;
                btn.classList.toggle('active');

                const existingStudySection = document.getElementById(`study-section-${study}`);

                if (btn.classList.contains('active') && !existingStudySection) {
                    specialStudiesContainer.insertAdjacentHTML('beforeend', specialStudiesTemplates[study] || '');
                } else if (!btn.classList.contains('active') && existingStudySection) {
                    existingStudySection.remove();
                }
            }
        });

        addInvestigationBtn.addEventListener('click', () => {
            investigationsContainer.insertAdjacentHTML('beforeend', investigationSetTemplate);
        });

        specialStudiesContainer.addEventListener('click', (e) => {
            if (e.target.id === 'ss-add-hplc-btn') {
                const container = document.getElementById('ss-hplc-peaks-container');
                if (container) container.insertAdjacentHTML('beforeend', hplcPeakTemplate);
            }
            if (e.target.id === 'ss-add-stain-btn') {
                const container = document.getElementById('ss-stains-container');
                if (container) container.insertAdjacentHTML('beforeend', stainTemplate);
            }
        });
    }
});