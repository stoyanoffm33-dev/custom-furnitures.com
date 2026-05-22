const fs = require('fs');
const path = require('path');

// Ensure directories exist
if (!fs.existsSync('privacy')) {
    fs.mkdirSync('privacy');
}
if (!fs.existsSync('terms')) {
    fs.mkdirSync('terms');
}

const indexHtml = fs.readFileSync('index.html', 'utf8');

// Split index.html to extract head, header, footer, and scripts
const mainStart = indexHtml.indexOf('<!-- Hero Section -->');
const contactStart = indexHtml.indexOf('<!-- Contact Section -->');

let headAndNav = indexHtml.substring(0, mainStart);
let footerAndScripts = indexHtml.substring(contactStart);

// Clean up: remove the contact form since it's not needed on simple legal pages,
// but keep the footer and script inclusions.
// Find footer position in the second half
const footerStart = footerAndScripts.indexOf('<footer');
if (footerStart !== -1) {
    footerAndScripts = footerAndScripts.substring(footerStart);
}

// Convert relative paths to subfolder-relative (prefix with ../)
function makeSubfolderRelative(content) {
    return content
        .replace(/href="css\/styles\.css"/g, 'href="../css/styles.css"')
        .replace(/src="assets\//g, 'src="../assets/')
        .replace(/href="assets\//g, 'href="../assets/')
        .replace(/src="js\//g, 'src="../js/')
        .replace(/href="index\.html"/g, 'href="../index.html"')
        .replace(/href="kitchen\.html"/g, 'href="../kitchen.html"')
        .replace(/href="bedroom\.html"/g, 'href="../bedroom.html"')
        .replace(/href="livingroom\.html"/g, 'href="../livingroom.html"')
        .replace(/href="kids-rooms\.html"/g, 'href="../kids-rooms.html"')
        .replace(/href="bathroom\.html"/g, 'href="../bathroom.html"')
        .replace(/data-href-bg="kuhnya\.html"/g, 'data-href-bg="../kuhnya.html"')
        .replace(/data-href-en="kitchen\.html"/g, 'data-href-en="../kitchen.html"')
        .replace(/data-href-bg="spalnya\.html"/g, 'data-href-bg="../spalnya.html"')
        .replace(/data-href-en="bedroom\.html"/g, 'data-href-en="../bedroom.html"')
        .replace(/data-href-bg="vsekidnevna\.html"/g, 'data-href-bg="../vsekidnevna.html"')
        .replace(/data-href-en="livingroom\.html"/g, 'data-href-en="../livingroom.html"')
        .replace(/data-href-bg="detski-stai\.html"/g, 'data-href-bg="../detski-stai.html"')
        .replace(/data-href-en="kids-rooms\.html"/g, 'data-href-en="../kids-rooms.html"')
        .replace(/data-href-bg="banya\.html"/g, 'data-href-bg="../banya.html"')
        .replace(/data-href-en="bathroom\.html"/g, 'data-href-en="../bathroom.html"')
        .replace(/href="review\.html"/g, 'href="../review.html"')
        .replace(/href="terms\/index\.html"/g, 'href="../terms/index.html"')
        .replace(/href="privacy\/index\.html"/g, 'href="../privacy/index.html"')
        .replace(/href="#contact"/g, 'href="../index.html#contact"')
        .replace(/href="#contact-form"/g, 'href="../index.html#contact-form"')
        .replace(/href="#quality-section"/g, 'href="../index.html#quality-section"')
        .replace(/href="#our-projects"/g, 'href="../index.html#our-projects"');
}

headAndNav = makeSubfolderRelative(headAndNav);
footerAndScripts = makeSubfolderRelative(footerAndScripts);

// Modify main-content block start
const mainContentStart = `
    <main class="main-content">
`;

// TERMS AND CONDITIONS CONTENT
const termsBody = `
        <section class="page-header" style="padding: 4rem var(--container-padding) 2rem; text-align: center;">
            <h1 class="premium-heading lang-bg" style="font-size: 2.5rem; display: inline-block;">Общи Условия</h1>
            <h1 class="premium-heading lang-en" style="font-size: 2.5rem; display: inline-block;">Terms & Conditions</h1>
        </section>
        
        <section class="legal-section" style="padding: 2rem var(--container-padding) 6rem; max-width: 800px; margin: 0 auto; line-height: 1.8; color: var(--text-main);">
            <style>
                .legal-section h2 {
                    font-size: 1.8rem;
                    font-weight: 500;
                    margin-top: 0;
                    margin-bottom: 2rem;
                    color: var(--text-main);
                    border-bottom: 1px solid var(--border-color);
                    padding-bottom: 0.5rem;
                }
                .legal-section h3 {
                    font-size: 1.3rem;
                    font-weight: 500;
                    margin-top: 2rem;
                    margin-bottom: 1rem;
                    color: var(--text-main);
                }
                .legal-section p, .legal-section ul {
                    margin-bottom: 1.5rem;
                    font-size: 1rem;
                    color: var(--text-muted);
                }
                .legal-section ul {
                    padding-left: 1.5rem;
                }
                .legal-section li {
                    margin-bottom: 0.5rem;
                }
            </style>
            <div class="lang-bg">
                <h2>ОБЩИ УСЛОВИЯ ЗА ПОЛЗВАНЕ</h2>
                <p>Тези Общи условия уреждат отношенията между „БАУ МИТ ЗЮТ АГ“ ЕООД, наричано по-долу „Доставчик“, и потребителите на уебсайта custom-furnitures.com, наричани по-долу „Потребители“.</p>
                
                <h3>1. Данни за Доставчика</h3>
                <p><strong>Наименование:</strong> „БАУ МИТ ЗЮТ АГ“ ЕООД<br>
                <strong>ЕИК/Булстат:</strong> 202362784<br>
                <strong>Седалище и адрес на управление:</strong> гр. София, ж.к. Младост 2, бл. 225, вх. А, 1799<br>
                <strong>МОЛ:</strong> Недко Станков<br>
                <strong>Електронна поща:</strong> <a href="mailto:office@custom-furnitures.com" style="color: #9d814c; text-decoration: underline;">office@custom-furnitures.com</a><br>
                <strong>Телефон:</strong> +359878359358</p>

                <h3>2. Предмет и дефиниции</h3>
                <p>Този сайт представлява онлайн каталог и платформа за отправяне на запитвания за изработка на мебели по индивидуален проект (поръчка).</p>
                <p>Сайтът custom-furnitures.com не е стандартен онлайн магазин с готови стоки. Всички цени, размери и срокове на сайта са примерни и подлежат на индивидуално договаряне.</p>

                <h3>3. Процес на поръчка и ценообразуване</h3>
                <p>Всяко изпратено запитване през контактната форма на Сайта няма обвързващ характер, а представлява заявка за изготвяне на индивидуална оферта.</p>
                <p>Финалната цена, спецификациите и дизайнът на мебелите се определят изрично в индивидуален писмен договор, подписан между Доставчика и Клиента след извършване на точна проверка на размерите (оглед).</p>

                <h3>4. Условия за плащане</h3>
                <p>Изработката на мебели по поръчка стартира само след заплащане на авансово плащане в размер на 50% от общата стойност на проекта, разписана в индивидуалния договор.</p>
                <p>Остатъкът от сумата се заплаща по начина и в сроковете, разписани в същия договор (след приключване на монтажа).</p>

                <h3>5. Право на отказ</h3>
                <p>Съгласно чл. 57, ал. 3 от Закона за защита на потребителите (ЗЗП), Потребителят няма право на отказ от договора от разстояние в рамките на 14 дни, тъй като стоките се изработват по индивидуална спецификация на клиента и според неговите лични изисквания.</p>
                <p>Анулиране на поръчка след стартиране на производството води до задържане на авансовото плащане за покриване на разходите за материали и труд.</p>

                <h3>6. Срокове и доставка</h3>
                <p>Сроковете за изработка се договарят индивидуално за всеки проект и започват да текат от датата на получаване на авансовото плащане и финализиране на проекта.</p>
                <p>Доставчикът не носи отговорност за забавяния, причинени от непреодолима сила (форсмажор) или забавяния от страна на външни доставчици на суровини.</p>

                <h3>7. Рекламации и гаранция</h3>
                <p>Търговската гаранция на мебелите е 24 месеца и покрива производствени дефекти, проблеми с обкова и механизмите при правилна експлоатация.</p>
                <p>Рекламации за видими дефекти (драскотини, наранявания) се предявяват на място по време на монтажа и приемането на обекта. Последващие рекламации за механични повреди, причинени от неправилна употреба, не се приемат.</p>
            </div>
            <div class="lang-en">
                <h2>TERMS AND CONDITIONS</h2>
                <p>These Terms and Conditions govern the relationship between "BAU MIT SUED AG" Ltd., hereinafter referred to as the "Provider", and the users of the website custom-furnitures.com, hereinafter referred to as "Users".</p>
                
                <h3>1. Provider Details</h3>
                <p><strong>Company Name:</strong> "BAU MIT SUED AG" Ltd.<br>
                <strong>UIC/VAT Number:</strong> BG202362784<br>
                <strong>Registered Office Address:</strong> Mladost 2, bl. 225, ent. A, 1799 Sofia<br>
                <strong>Management:</strong> Nedko Stankov<br>
                <strong>Contact Email:</strong> <a href="mailto:office@custom-furnitures.com" style="color: #9d814c; text-decoration: underline;">office@custom-furnitures.com</a><br>
                <strong>Phone:</strong> +359878359358</p>

                <h3>2. Subject and Definitions</h3>
                <p>This website custom-furnitures.com is an online catalog and a platform for inquiries regarding custom furniture manufacturing based on individual projects.</p>
                <p>The "Website" is not a standard online shop with ready-made goods. All prices, sizes, and terms on the website are exemplary and subject to individual negotiation.</p>

                <h3>3. Order Process and Pricing</h3>
                <p>Any inquiry sent via the contact form on the Website is non-binding and represents a request for an individual price quote.</p>
                <p>The final price, specifications, and design of the furniture are explicitly defined in an individual written contract signed between the Provider and the Client after an accurate measurement and site inspection.</p>

                <h3>4. Terms of Payment</h3>
                <p>The production of custom furniture begins only after an advance payment of 50% of the total project value specified in the individual contract is received.</p>
                <p>The remaining balance is paid in the manner and within the timeframes specified in the same contract (upon completion of the installation).</p>

                <h3>5. Right of Withdrawal</h3>
                <p>According to Art. 57, al. 3 of the Bulgarian Consumer Protection Act (CPA) and EU regulations, the User has no right to withdraw from a distance contract within 14 days, as the goods are manufactured according to individual customer specifications and personal requirements.</p>
                <p>Cancellation of an order after production has started results in the forfeiture of the advance payment to cover material and labor costs.</p>

                <h3>6. Deadlines and Delivery</h3>
                <p>Production deadlines are negotiated individually for each project and start from the date the advance payment is received and the final design is approved.</p>
                <p>The Provider is not responsible for delays caused by force majeure or delays from external suppliers of raw materials.</p>

                <h3>7. Complaints and Warranty</h3>
                <p>The commercial warranty for the furniture is 24 months and covers manufacturing defects, hardware, and mechanism issues under correct exploitation.</p>
                <p>Complaints regarding visible defects (scratches, damages) must be made on-site during installation and final handover. Subsequent claims for mechanical damage caused by misuse will not be accepted.</p>
            </div>
        </section>
    </main>
`;

// PRIVACY POLICY CONTENT
const privacyBody = `
        <section class="page-header" style="padding: 4rem var(--container-padding) 2rem; text-align: center;">
            <h1 class="premium-heading lang-bg" style="font-size: 2.5rem; display: inline-block;">Политика за Поверителност</h1>
            <h1 class="premium-heading lang-en" style="font-size: 2.5rem; display: inline-block;">Privacy Policy</h1>
        </section>
        
        <section class="legal-section" style="padding: 2rem var(--container-padding) 6rem; max-width: 800px; margin: 0 auto; line-height: 1.8; color: var(--text-main);">
            <style>
                .legal-section h2 {
                    font-size: 1.8rem;
                    font-weight: 500;
                    margin-top: 0;
                    margin-bottom: 2rem;
                    color: var(--text-main);
                    border-bottom: 1px solid var(--border-color);
                    padding-bottom: 0.5rem;
                }
                .legal-section h3 {
                    font-size: 1.3rem;
                    font-weight: 500;
                    margin-top: 2rem;
                    margin-bottom: 1rem;
                    color: var(--text-main);
                }
                .legal-section p, .legal-section ul {
                    margin-bottom: 1.5rem;
                    font-size: 1rem;
                    color: var(--text-muted);
                }
                .legal-section ul {
                    padding-left: 1.5rem;
                }
                .legal-section li {
                    margin-bottom: 0.5rem;
                }
            </style>
            <div class="lang-bg">
                <h2>ПОЛИТИКА ЗА ПОВЕРИТЕЛНОСТ</h2>
                <p>„БАУ МИТ ЗЮТ АГ“ ЕООД зачита поверителността на вашите лични данни и се ангажира с тяхната защита в съответствие с Общия регламент за защита на данните (GDPR).</p>
                
                <h3>1. Администратор на лични данни</h3>
                <p>Администратор на данните е „БАУ МИТ ЗЮТ АГ“ ЕООД, ЕИК 202362784, със седалище и адрес на управление: гр. София, ж.к. Младост 2, бл. 225, вх. А, 1799.</p>
                <p><strong>Електронна поща за въпроси относно лични данни:</strong> <a href="mailto:office@custom-furnitures.com" style="color: #9d814c; text-decoration: underline;">office@custom-furnitures.com</a></p>

                <h3>2. Какви данни събираме и защо</h3>
                <p>Когато използвате нашата форма за запитване на custom-furnitures.com, ние събираме следните данни:</p>
                <ul>
                    <li><strong>Име и фамилия</strong> – за да знаем как да се обърнем към вас.</li>
                    <li><strong>Телефонен номер</strong> – за бърза връзка и уговаряне на оглед.</li>
                    <li><strong>Имейл адрес</strong> – за изпращане на оферти и визуализации.</li>
                    <li><strong>Текст на запитването</strong> – съдържащ информация за вашите предпочитания, размери и нужди.</li>
                </ul>

                <h3>3. Правно основание за обработка</h3>
                <p>Ние обработваме вашите данни на основание предприемане на стъпки по сключване на договор за изработка на мебели по ваше искане (чл. 6, ал. 1, б. "б" от GDPR).</p>

                <h3>4. Споделяне на данните с трети лица</h3>
                <p>Ние НЕ продаваме и не предоставяме вашите данни за маркетингови цели на трети страни. Те могат да бъдат споделени само със:</p>
                <ul>
                    <li>Служители или подизпълнители на фирмата (дизайнери, монтажници), пряко ангажирани с вашия проект.</li>
                    <li>Счетоводна къща за целите на издаване на фактури.</li>
                    <li>Хостинг доставчика, на чиито сървъри се намира този уебсайт.</li>
                </ul>

                <h3>5. Срок на съхранение</h3>
                <p>Ако запитването не премине в реална поръчка, вашите данни се изтриват в срок от 6 месеца.</p>
                <p>При сключване на договор, данните се пазят за законовия счетоводен срок от 10 години.</p>

                <h3>6. Вашите права</h3>
                <p>Като субект на данни имате следните права по всяко време:</p>
                <ul>
                    <li>Право на достъп и копие от данните ви.</li>
                    <li>Право на коригиране на неточни данни.</li>
                    <li>Право на изтриване ("право да бъдете забравени").</li>
                    <li>Право да подадете жалба до Комисията за защита на личните данни (КЗЛД) при установено нарушение.</li>
                </ul>
            </div>
            <div class="lang-en">
                <h2>PRIVACY POLICY</h2>
                <p>"BAU MIT SUED AG" Ltd. respects the privacy of your personal data and is committed to protecting it in accordance with the General Data Protection Regulation (GDPR).</p>
                
                <h3>1. Data Controller</h3>
                <p>The data controller is "BAU MIT SUED AG" Ltd., UIC BG202362784, based in Mladost 2, bl. 225, ent. A, 1799 Sofia.</p>
                <p><strong>Email for data inquiries:</strong> <a href="mailto:office@custom-furnitures.com" style="color: #9d814c; text-decoration: underline;">office@custom-furnitures.com</a></p>

                <h3>2. What Data We Collect and Why</h3>
                <p>When you use our inquiry form on custom-furnitures.com, we collect the following data:</p>
                <ul>
                    <li><strong>Name and surname</strong> – to know how to address you.</li>
                    <li><strong>Phone number</strong> – for quick communication and arranging a site inspection.</li>
                    <li><strong>Email address</strong> – for sending offers and design visualizations.</li>
                    <li><strong>Message text</strong> – containing information about your preferences, measurements, and needs.</li>
                </ul>

                <h3>3. Legal Basis for Processing</h3>
                <p>We process your data on the basis of taking steps at the request of the data subject prior to entering into a contract for custom furniture manufacturing (Art. 6, paragraph 1, b. "b" of the GDPR).</p>

                <h3>4. Data Sharing with Third Parties</h3>
                <p>We DO NOT sell or share your data with third parties for marketing purposes. It may only be shared with:</p>
                <ul>
                    <li>Employees or subcontractors of the company (designers, installers) directly involved in your project.</li>
                    <li>An accounting agency for the purpose of issuing invoices.</li>
                    <li>The hosting provider on whose servers this website is located.</li>
                    <li>The hosting provider on whose servers this website is located.</li>
                </ul>

                <h3>5. Retention Period</h3>
                <p>If the inquiry does not lead to a contract, your data will be deleted within 6 months.</p>
                <p>Upon entering into a contract, the data is kept for the legal accounting period of 10 years.</p>

                <h3>6. Your Rights</h3>
                <p>As a data subject, you have the following rights at any time:</p>
                <ul>
                    <li>The right to access and receive a copy of your data.</li>
                    <li>The right to rectify inaccurate data.</li>
                    <li>The right to erasure ("the right to be forgotten").</li>
                    <li>The right to lodge a complaint with the Commission for Personal Data Protection (CPDP) or your local supervisory authority in case of a violation.</li>
                </ul>
            </div>
        </section>
    </main>
`;

// Write Terms & Conditions Page
fs.writeFileSync(path.join('terms', 'index.html'), headAndNav + termsBody + footerAndScripts);
console.log('Terms page generated at terms/index.html.');

// Write Privacy Policy Page
fs.writeFileSync(path.join('privacy', 'index.html'), headAndNav + privacyBody + footerAndScripts);
console.log('Privacy page generated at privacy/index.html.');
