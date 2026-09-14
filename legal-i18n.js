/* ══════════════════════════════════════════════════════════════
   AVENTICUM QUEST — Système de langue partagé des pages légales
   (mentions-legales.html · cgv.html · confidentialite.html)

   Chaque page définit window.AQ_PAGE = 'ml' | 'cgv' | 'conf'
   avant de charger ce script, puis balise son contenu avec
   data-i18n (texte) et data-i18n-html (contenu HTML).
   La langue est partagée avec index.html via localStorage['aq-lang'].
══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── Titres de page (document.title) ─────────────────────── */
  const PAGE_TITLES = {
    ml: {
      fr: 'Mentions légales — Aventicum Quest',
      en: 'Legal notice — Aventicum Quest',
      de: 'Impressum — Aventicum Quest'
    },
    cgv: {
      fr: 'Conditions générales de vente — Aventicum Quest',
      en: 'Terms and Conditions of Sale — Aventicum Quest',
      de: 'Allgemeine Geschäftsbedingungen — Aventicum Quest'
    },
    conf: {
      fr: 'Politique de confidentialité — Aventicum Quest',
      en: 'Privacy Policy — Aventicum Quest',
      de: 'Datenschutzerklärung — Aventicum Quest'
    }
  };

  /* ── Dictionnaire de traduction ──────────────────────────── */
  const T = {
    /* ═══════════════════════ FRANÇAIS ═══════════════════════ */
    fr: {
      /* Éléments communs (nav / footer / entête) */
      'nav-cta':       'Acheter',
      'legal-back':    '← Retour à l\'accueil',
      'legal-date':    'Dernière mise à jour : juin 2026',
      'foot-ml':       'Mentions légales',
      'foot-cgv':      'Conditions générales',
      'foot-conf':     'Confidentialité',
      'foot-copy':     '© 2026 Aventicum Quest · Avenches, Suisse',

      /* ── Mentions légales ── */
      'ml-title':      'Mentions légales',
      'ml-h1':         'Éditeur du site',
      'ml-p1':         '<strong>Aventicum Quest</strong><br>Bjorn Vollenweider<br>1580 Avenches, Suisse<br>Contact : <a href="mailto:info@aventicumquest.ch">info@aventicumquest.ch</a>',
      'ml-h2':         'Hébergement',
      'ml-p2':         'Le site aventicumquest.ch est hébergé sur <strong>GitHub Pages</strong>, service de GitHub, Inc., 88 Colin P Kelly Jr St, San Francisco, CA 94107, États-Unis.',
      'ml-h3':         'Propriété intellectuelle',
      'ml-p3a':        'L\'ensemble des éléments constituant le site aventicumquest.ch (textes, images, mise en page, logo, code source) est la propriété exclusive d\'Aventicum Quest, sauf mention contraire. Toute reproduction, modification ou diffusion sans autorisation préalable est interdite.',
      'ml-p3b':        'Les photographies de monuments présentées sur ce site ont été prises lors de repérages sur le site archéologique d\'Avenches. Les reconstitutions historiques affichées proviennent de sources libres de droits ou sous licence Creative Commons dûment mentionnée.',
      'ml-h4':         'Responsabilité',
      'ml-p4a':        'Aventicum Quest s\'efforce de fournir des informations exactes et à jour. Toutefois, la responsabilité de l\'éditeur ne saurait être engagée en cas d\'erreur ou d\'omission, ni pour tout dommage résultant de l\'utilisation du site.',
      'ml-p4b':        'Les liens hypertextes vers des sites tiers n\'engagent pas la responsabilité d\'Aventicum Quest quant au contenu de ces sites.',
      'ml-h5':         'Droit applicable',
      'ml-p5':         'Le présent site et son contenu sont soumis au droit suisse. En cas de litige, les tribunaux du canton de Vaud sont seuls compétents.',

      /* ── Conditions générales de vente ── */
      'cgv-title':     'Conditions générales de vente',
      'cgv-a1-h':      'Art. 1 — Vendeur',
      'cgv-a1-p':      '<strong>Aventicum Quest</strong>, exploité par Bjorn Vollenweider, 1580 Avenches, Suisse.<br>Contact : <a href="mailto:info@aventicumquest.ch">info@aventicumquest.ch</a>',
      'cgv-a2-h':      'Art. 2 — Objet',
      'cgv-a2-p':      'Les présentes conditions régissent la vente en ligne de codes d\'accès au jeu de piste urbain <em>Aventicum Quest — Operatio Aquila</em>, accessible via aventicumquest.ch, à pratiquer sur le site archéologique d\'Avenches (VD, Suisse).',
      'cgv-a3-h':      'Art. 3 — Prix',
      'cgv-a3-p1':     'Les prix sont indiqués en francs suisses (CHF), TVA incluse :',
      'cgv-a3-ul':     '<li>Adulte (16 ans et +) : <strong>12 CHF</strong></li><li>Enfant (6–15 ans) : <strong>8 CHF</strong></li><li>Moins de 6 ans : <strong>gratuit</strong></li>',
      'cgv-a3-p2':     'Un seul code est nécessaire par participant adulte ou enfant (6 ans et +). Les enfants de moins de 6 ans ne nécessitent pas de code.',
      'cgv-a4-h':      'Art. 4 — Commande et paiement',
      'cgv-a4-p1':     'La commande est passée via le site aventicumquest.ch. Le paiement est traité de façon sécurisée par <strong>Stripe, Inc.</strong> Les informations de paiement ne sont jamais stockées par Aventicum Quest.',
      'cgv-a4-p2':     'La vente est réputée conclue à réception de la confirmation de paiement.',
      'cgv-a5-h':      'Art. 5 — Livraison du code',
      'cgv-a5-p1':     'Le code d\'accès est transmis par e-mail à l\'adresse indiquée lors de la commande, dans les 15 minutes suivant la confirmation de paiement. En cas de non-réception, vérifiez vos courriers indésirables ou contactez <a href="mailto:info@aventicumquest.ch">info@aventicumquest.ch</a>.',
      'cgv-a5-p2':     'Le code est valable <strong>6 mois</strong> à compter de la date d\'achat. Il est à usage unique et ne peut être utilisé que sur un seul appareil à la fois.',
      'cgv-a6-h':      'Art. 6 — Rétractation et remboursement',
      'cgv-a6-p1':     'Conformément à l\'art. 40d CO suisse, le droit de révocation s\'applique dans un délai de 14 jours à compter de l\'achat, <strong>à condition que le code n\'ait pas encore été utilisé</strong>. Une fois le code activé, aucun remboursement ne peut être accordé.',
      'cgv-a6-p2':     'Pour exercer votre droit de rétractation, contactez <a href="mailto:info@aventicumquest.ch">info@aventicumquest.ch</a> en indiquant votre numéro de commande.',
      'cgv-a7-h':      'Art. 7 — Responsabilité et sécurité',
      'cgv-a7-p1':     'Le jeu se pratique en plein air sur la voie publique et des espaces ouverts au public. Chaque participant est responsable de sa propre sécurité. Aventicum Quest ne saurait être tenu responsable d\'accidents, blessures ou dommages survenus lors de la pratique du jeu.',
      'cgv-a7-p2':     'Le jeu est déconseillé par temps d\'orage. Les participants mineurs doivent être accompagnés d\'un adulte responsable.',
      'cgv-a8-h':      'Art. 8 — Propriété intellectuelle',
      'cgv-a8-p':      'L\'ensemble du contenu du jeu (textes, énigmes, illustrations, interface) est la propriété exclusive d\'Aventicum Quest. Toute reproduction, même partielle, est interdite sans autorisation préalable.',
      'cgv-a9-h':      'Art. 9 — Données personnelles',
      'cgv-a9-p':      'Le traitement des données personnelles est décrit dans notre <a href="confidentialite.html">politique de confidentialité</a>.',
      'cgv-a10-h':     'Art. 10 — Droit applicable et litiges',
      'cgv-a10-p':     'Les présentes conditions sont soumises au droit suisse. Tout litige relève de la compétence exclusive des tribunaux du canton de Vaud, sous réserve d\'un recours devant le Tribunal fédéral.',
      'cgv-a11-h':     'Art. 11 — Contact',
      'cgv-a11-p':     'Pour toute question relative à une commande :<br><a href="mailto:info@aventicumquest.ch">info@aventicumquest.ch</a>',

      /* ── Politique de confidentialité ── */
      'conf-title':    'Politique de confidentialité',
      'conf-h1':       'Responsable du traitement',
      'conf-p1a':      '<strong>Aventicum Quest</strong>, exploité par Bjorn Vollenweider, 1580 Avenches, Suisse.<br>Contact : <a href="mailto:info@aventicumquest.ch">info@aventicumquest.ch</a>',
      'conf-p1b':      'La présente politique s\'applique au site aventicumquest.ch et au jeu Aventicum Quest — Operatio Aquila. Elle est conforme à la Loi fédérale suisse sur la protection des données (LPD, révisée, en vigueur depuis septembre 2023) et, dans la mesure applicable, au Règlement général sur la protection des données (RGPD).',
      'conf-h2':       'Données collectées et finalités',
      'conf-h2a':      'Lors d\'un achat',
      'conf-p2a':      'Lors de la commande d\'un code d\'accès, les données suivantes sont collectées :',
      'conf-ul2a':     '<li>Adresse e-mail (nécessaire pour la transmission du code)</li><li>Données de paiement (traitées exclusivement par <strong>Stripe, Inc.</strong> — Aventicum Quest n\'a jamais accès à vos numéros de carte)</li>',
      'conf-p2b':      'Base juridique : exécution d\'un contrat (art. 31 al. 2 let. a LPD).',
      'conf-h2b':      'Lors de l\'utilisation du jeu',
      'conf-p2c':      'La progression dans le jeu est stockée localement sur votre appareil (localStorage). Aucune donnée de jeu n\'est transmise à nos serveurs.',
      'conf-h2c':      'Cookies et traceurs',
      'conf-p2d':      'Le site utilise uniquement des cookies fonctionnels (mémorisation de votre consentement aux cookies). Aucun cookie publicitaire ou de profilage n\'est déposé sans votre accord explicite. Vous pouvez modifier vos préférences à tout moment via la bannière de consentement affichée à votre première visite.',
      'conf-h3':       'Durée de conservation',
      'conf-ul3':      '<li>Données de commande (e-mail, référence de paiement) : conservées <strong>10 ans</strong> conformément aux obligations comptables suisses (art. 958f CO)</li><li>Préférences de cookies : conservées jusqu\'à suppression des données de votre navigateur</li>',
      'conf-h4':       'Partage des données',
      'conf-p4':       'Vos données ne sont jamais vendues ni louées à des tiers. Elles peuvent être transmises à :',
      'conf-ul4':      '<li><strong>Stripe, Inc.</strong> — traitement du paiement (politique de confidentialité : stripe.com/privacy)</li><li><strong>GitHub, Inc.</strong> — hébergement du site via GitHub Pages (politique : docs.github.com/privacy)</li>',
      'conf-p4b':      'Ces sous-traitants sont soumis à des obligations contractuelles de protection des données conformes au droit applicable.',
      'conf-h5':       'Transferts hors de Suisse',
      'conf-p5':       'Stripe et GitHub sont des entités américaines. Les transferts sont encadrés par des clauses contractuelles types ou par l\'adéquation reconnue par la Suisse.',
      'conf-h6':       'Vos droits',
      'conf-p6a':      'Conformément à la LPD, vous disposez des droits suivants :',
      'conf-ul6':      '<li>Droit d\'accès à vos données personnelles</li><li>Droit de rectification des données inexactes</li><li>Droit à l\'effacement (dans les limites des obligations légales de conservation)</li><li>Droit à la portabilité de vos données</li><li>Droit d\'opposition au traitement</li>',
      'conf-p6b':      'Pour exercer ces droits, contactez : <a href="mailto:info@aventicumquest.ch">info@aventicumquest.ch</a>',
      'conf-p6c':      'Si vous estimez que vos droits ne sont pas respectés, vous pouvez déposer une plainte auprès du <strong>Préposé fédéral à la protection des données et à la transparence (PFPDT)</strong> — <a href="https://www.edoeb.admin.ch" target="_blank" rel="noopener">www.edoeb.admin.ch</a>',
      'conf-h7':       'Sécurité',
      'conf-p7':       'Le site est servi exclusivement via HTTPS. Aucune donnée de paiement ne transite ni n\'est stockée sur nos serveurs. La génération et la distribution des codes sont gérées par Stripe de façon sécurisée.',
      'conf-h8':       'Modifications',
      'conf-p8':       'Cette politique peut être mise à jour. La date de dernière révision est indiquée en haut de page. En cas de modification substantielle, une information sera publiée sur le site.'
    },

    /* ═══════════════════════ ENGLISH ════════════════════════ */
    en: {
      'nav-cta':       'Buy',
      'legal-back':    '← Back to home',
      'legal-date':    'Last updated: June 2026',
      'foot-ml':       'Legal notice',
      'foot-cgv':      'Terms & Conditions',
      'foot-conf':     'Privacy',
      'foot-copy':     '© 2026 Aventicum Quest · Avenches, Switzerland',

      'ml-title':      'Legal notice',
      'ml-h1':         'Site publisher',
      'ml-p1':         '<strong>Aventicum Quest</strong><br>Bjorn Vollenweider<br>1580 Avenches, Switzerland<br>Contact: <a href="mailto:info@aventicumquest.ch">info@aventicumquest.ch</a>',
      'ml-h2':         'Hosting',
      'ml-p2':         'The site aventicumquest.ch is hosted on <strong>GitHub Pages</strong>, a service of GitHub, Inc., 88 Colin P Kelly Jr St, San Francisco, CA 94107, United States.',
      'ml-h3':         'Intellectual property',
      'ml-p3a':        'All elements making up the aventicumquest.ch site (texts, images, layout, logo, source code) are the exclusive property of Aventicum Quest, unless otherwise stated. Any reproduction, modification or distribution without prior authorisation is prohibited.',
      'ml-p3b':        'The photographs of monuments shown on this site were taken during scouting visits to the archaeological site of Avenches. The historical reconstructions displayed come from royalty-free sources or are used under a duly credited Creative Commons licence.',
      'ml-h4':         'Liability',
      'ml-p4a':        'Aventicum Quest strives to provide accurate and up-to-date information. However, the publisher cannot be held liable for any error or omission, nor for any damage resulting from use of the site.',
      'ml-p4b':        'Hyperlinks to third-party sites do not engage the liability of Aventicum Quest with regard to the content of those sites.',
      'ml-h5':         'Applicable law',
      'ml-p5':         'This site and its content are subject to Swiss law. In the event of a dispute, the courts of the Canton of Vaud shall have sole jurisdiction.',

      'cgv-title':     'General Terms and Conditions of Sale',
      'cgv-a1-h':      'Art. 1 — Seller',
      'cgv-a1-p':      '<strong>Aventicum Quest</strong>, operated by Bjorn Vollenweider, 1580 Avenches, Switzerland.<br>Contact: <a href="mailto:info@aventicumquest.ch">info@aventicumquest.ch</a>',
      'cgv-a2-h':      'Art. 2 — Purpose',
      'cgv-a2-p':      'These terms govern the online sale of access codes for the urban outdoor game <em>Aventicum Quest — Operatio Aquila</em>, available via aventicumquest.ch and played at the archaeological site of Avenches (Vaud, Switzerland).',
      'cgv-a3-h':      'Art. 3 — Prices',
      'cgv-a3-p1':     'Prices are shown in Swiss francs (CHF), VAT included:',
      'cgv-a3-ul':     '<li>Adult (16 years and over): <strong>CHF 12</strong></li><li>Child (6–15 years): <strong>CHF 8</strong></li><li>Under 6 years: <strong>free</strong></li>',
      'cgv-a3-p2':     'One code is required per adult or child participant (6 years and over). Children under 6 do not require a code.',
      'cgv-a4-h':      'Art. 4 — Order and payment',
      'cgv-a4-p1':     'Orders are placed via the aventicumquest.ch site. Payment is processed securely by <strong>Stripe, Inc.</strong> Payment details are never stored by Aventicum Quest.',
      'cgv-a4-p2':     'The sale is deemed concluded upon receipt of payment confirmation.',
      'cgv-a5-h':      'Art. 5 — Delivery of the code',
      'cgv-a5-p1':     'The access code is sent by email to the address given at the time of ordering, within 15 minutes of payment confirmation. If you do not receive it, please check your spam folder or contact <a href="mailto:info@aventicumquest.ch">info@aventicumquest.ch</a>.',
      'cgv-a5-p2':     'The code is valid for <strong>6 months</strong> from the date of purchase. It is single-use and may only be used on one device at a time.',
      'cgv-a6-h':      'Art. 6 — Withdrawal and refund',
      'cgv-a6-p1':     'In accordance with art. 40d of the Swiss Code of Obligations, the right of withdrawal applies within 14 days of purchase, <strong>provided the code has not yet been used</strong>. Once the code has been activated, no refund can be granted.',
      'cgv-a6-p2':     'To exercise your right of withdrawal, contact <a href="mailto:info@aventicumquest.ch">info@aventicumquest.ch</a> quoting your order number.',
      'cgv-a7-h':      'Art. 7 — Liability and safety',
      'cgv-a7-p1':     'The game is played outdoors on public roads and spaces open to the public. Each participant is responsible for their own safety. Aventicum Quest cannot be held liable for accidents, injuries or damage occurring during play.',
      'cgv-a7-p2':     'The game is not advised during thunderstorms. Minor participants must be accompanied by a responsible adult.',
      'cgv-a8-h':      'Art. 8 — Intellectual property',
      'cgv-a8-p':      'All game content (texts, riddles, illustrations, interface) is the exclusive property of Aventicum Quest. Any reproduction, even partial, is prohibited without prior authorisation.',
      'cgv-a9-h':      'Art. 9 — Personal data',
      'cgv-a9-p':      'The processing of personal data is described in our <a href="confidentialite.html">privacy policy</a>.',
      'cgv-a10-h':     'Art. 10 — Applicable law and disputes',
      'cgv-a10-p':     'These terms are subject to Swiss law. Any dispute falls under the exclusive jurisdiction of the courts of the Canton of Vaud, subject to appeal before the Federal Supreme Court.',
      'cgv-a11-h':     'Art. 11 — Contact',
      'cgv-a11-p':     'For any question regarding an order:<br><a href="mailto:info@aventicumquest.ch">info@aventicumquest.ch</a>',

      'conf-title':    'Privacy Policy',
      'conf-h1':       'Data controller',
      'conf-p1a':      '<strong>Aventicum Quest</strong>, operated by Bjorn Vollenweider, 1580 Avenches, Switzerland.<br>Contact: <a href="mailto:info@aventicumquest.ch">info@aventicumquest.ch</a>',
      'conf-p1b':      'This policy applies to the aventicumquest.ch site and to the Aventicum Quest — Operatio Aquila game. It complies with the Swiss Federal Act on Data Protection (FADP, revised, in force since September 2023) and, where applicable, with the General Data Protection Regulation (GDPR).',
      'conf-h2':       'Data collected and purposes',
      'conf-h2a':      'When making a purchase',
      'conf-p2a':      'When ordering an access code, the following data is collected:',
      'conf-ul2a':     '<li>Email address (required to deliver the code)</li><li>Payment data (processed exclusively by <strong>Stripe, Inc.</strong> — Aventicum Quest never has access to your card numbers)</li>',
      'conf-p2b':      'Legal basis: performance of a contract (art. 31 para. 2 let. a FADP).',
      'conf-h2b':      'When using the game',
      'conf-p2c':      'Your progress in the game is stored locally on your device (localStorage). No game data is transmitted to our servers.',
      'conf-h2c':      'Cookies and trackers',
      'conf-p2d':      'The site uses only functional cookies (to remember your cookie consent). No advertising or profiling cookie is set without your explicit consent. You can change your preferences at any time via the consent banner shown on your first visit.',
      'conf-h3':       'Retention period',
      'conf-ul3':      '<li>Order data (email, payment reference): kept for <strong>10 years</strong> in accordance with Swiss accounting obligations (art. 958f CO)</li><li>Cookie preferences: kept until you clear your browser data</li>',
      'conf-h4':       'Data sharing',
      'conf-p4':       'Your data is never sold or rented to third parties. It may be transmitted to:',
      'conf-ul4':      '<li><strong>Stripe, Inc.</strong> — payment processing (privacy policy: stripe.com/privacy)</li><li><strong>GitHub, Inc.</strong> — site hosting via GitHub Pages (policy: docs.github.com/privacy)</li>',
      'conf-p4b':      'These processors are bound by contractual data-protection obligations in accordance with applicable law.',
      'conf-h5':       'Transfers outside Switzerland',
      'conf-p5':       'Stripe and GitHub are US entities. Transfers are governed by standard contractual clauses or by the adequacy recognised by Switzerland.',
      'conf-h6':       'Your rights',
      'conf-p6a':      'In accordance with the FADP, you have the following rights:',
      'conf-ul6':      '<li>Right of access to your personal data</li><li>Right to rectification of inaccurate data</li><li>Right to erasure (within the limits of legal retention obligations)</li><li>Right to portability of your data</li><li>Right to object to processing</li>',
      'conf-p6b':      'To exercise these rights, contact: <a href="mailto:info@aventicumquest.ch">info@aventicumquest.ch</a>',
      'conf-p6c':      'If you believe your rights are not being respected, you may lodge a complaint with the <strong>Federal Data Protection and Information Commissioner (FDPIC)</strong> — <a href="https://www.edoeb.admin.ch" target="_blank" rel="noopener">www.edoeb.admin.ch</a>',
      'conf-h7':       'Security',
      'conf-p7':       'The site is served exclusively over HTTPS. No payment data passes through or is stored on our servers. The generation and distribution of codes are handled securely by Stripe.',
      'conf-h8':       'Changes',
      'conf-p8':       'This policy may be updated. The date of the latest revision is shown at the top of the page. In the event of a substantial change, a notice will be published on the site.'
    },

    /* ═══════════════════════ DEUTSCH ════════════════════════ */
    de: {
      'nav-cta':       'Kaufen',
      'legal-back':    '← Zurück zur Startseite',
      'legal-date':    'Zuletzt aktualisiert: Juni 2026',
      'foot-ml':       'Impressum',
      'foot-cgv':      'AGB',
      'foot-conf':     'Datenschutz',
      'foot-copy':     '© 2026 Aventicum Quest · Avenches, Schweiz',

      'ml-title':      'Impressum',
      'ml-h1':         'Betreiber der Website',
      'ml-p1':         '<strong>Aventicum Quest</strong><br>Bjorn Vollenweider<br>1580 Avenches, Schweiz<br>Kontakt: <a href="mailto:info@aventicumquest.ch">info@aventicumquest.ch</a>',
      'ml-h2':         'Hosting',
      'ml-p2':         'Die Website aventicumquest.ch wird auf <strong>GitHub Pages</strong> gehostet, einem Dienst von GitHub, Inc., 88 Colin P Kelly Jr St, San Francisco, CA 94107, USA.',
      'ml-h3':         'Geistiges Eigentum',
      'ml-p3a':        'Sämtliche Bestandteile der Website aventicumquest.ch (Texte, Bilder, Layout, Logo, Quellcode) sind, sofern nicht anders angegeben, ausschliessliches Eigentum von Aventicum Quest. Jede Vervielfältigung, Änderung oder Verbreitung ohne vorherige Genehmigung ist untersagt.',
      'ml-p3b':        'Die auf dieser Website gezeigten Fotografien der Denkmäler wurden bei Erkundungen auf dem archäologischen Gelände von Avenches aufgenommen. Die dargestellten historischen Rekonstruktionen stammen aus gemeinfreien Quellen oder stehen unter einer ordnungsgemäss genannten Creative-Commons-Lizenz.',
      'ml-h4':         'Haftung',
      'ml-p4a':        'Aventicum Quest bemüht sich, genaue und aktuelle Informationen bereitzustellen. Der Betreiber haftet jedoch nicht für Fehler oder Auslassungen noch für Schäden, die aus der Nutzung der Website entstehen.',
      'ml-p4b':        'Für den Inhalt verlinkter Websites Dritter übernimmt Aventicum Quest keine Haftung.',
      'ml-h5':         'Anwendbares Recht',
      'ml-p5':         'Diese Website und ihr Inhalt unterliegen dem schweizerischen Recht. Im Streitfall sind ausschliesslich die Gerichte des Kantons Waadt zuständig.',

      'cgv-title':     'Allgemeine Geschäftsbedingungen',
      'cgv-a1-h':      'Art. 1 — Verkäufer',
      'cgv-a1-p':      '<strong>Aventicum Quest</strong>, betrieben von Bjorn Vollenweider, 1580 Avenches, Schweiz.<br>Kontakt: <a href="mailto:info@aventicumquest.ch">info@aventicumquest.ch</a>',
      'cgv-a2-h':      'Art. 2 — Gegenstand',
      'cgv-a2-p':      'Diese Bedingungen regeln den Online-Verkauf von Zugangscodes für das Outdoor-Stadtspiel <em>Aventicum Quest — Operatio Aquila</em>, erreichbar über aventicumquest.ch und zu spielen auf dem archäologischen Gelände von Avenches (VD, Schweiz).',
      'cgv-a3-h':      'Art. 3 — Preise',
      'cgv-a3-p1':     'Die Preise sind in Schweizer Franken (CHF) inklusive MwSt. angegeben:',
      'cgv-a3-ul':     '<li>Erwachsener (16 Jahre und älter): <strong>12 CHF</strong></li><li>Kind (6–15 Jahre): <strong>8 CHF</strong></li><li>Unter 6 Jahren: <strong>gratis</strong></li>',
      'cgv-a3-p2':     'Pro erwachsenem oder kindlichem Teilnehmer (ab 6 Jahren) wird ein Code benötigt. Kinder unter 6 Jahren benötigen keinen Code.',
      'cgv-a4-h':      'Art. 4 — Bestellung und Zahlung',
      'cgv-a4-p1':     'Die Bestellung erfolgt über die Website aventicumquest.ch. Die Zahlung wird sicher über <strong>Stripe, Inc.</strong> abgewickelt. Zahlungsdaten werden von Aventicum Quest niemals gespeichert.',
      'cgv-a4-p2':     'Der Kauf gilt mit Eingang der Zahlungsbestätigung als abgeschlossen.',
      'cgv-a5-h':      'Art. 5 — Lieferung des Codes',
      'cgv-a5-p1':     'Der Zugangscode wird innerhalb von 15 Minuten nach der Zahlungsbestätigung per E-Mail an die bei der Bestellung angegebene Adresse gesendet. Falls Sie ihn nicht erhalten, prüfen Sie Ihren Spam-Ordner oder kontaktieren Sie <a href="mailto:info@aventicumquest.ch">info@aventicumquest.ch</a>.',
      'cgv-a5-p2':     'Der Code ist <strong>6 Monate</strong> ab Kaufdatum gültig. Er ist zur einmaligen Verwendung bestimmt und kann jeweils nur auf einem Gerät genutzt werden.',
      'cgv-a6-h':      'Art. 6 — Widerruf und Rückerstattung',
      'cgv-a6-p1':     'Gemäss Art. 40d des schweizerischen Obligationenrechts gilt das Widerrufsrecht innerhalb von 14 Tagen ab Kauf, <strong>sofern der Code noch nicht verwendet wurde</strong>. Nach Aktivierung des Codes ist keine Rückerstattung mehr möglich.',
      'cgv-a6-p2':     'Um Ihr Widerrufsrecht auszuüben, kontaktieren Sie <a href="mailto:info@aventicumquest.ch">info@aventicumquest.ch</a> unter Angabe Ihrer Bestellnummer.',
      'cgv-a7-h':      'Art. 7 — Haftung und Sicherheit',
      'cgv-a7-p1':     'Das Spiel wird im Freien auf öffentlichen Strassen und öffentlich zugänglichen Flächen gespielt. Jeder Teilnehmer ist für seine eigene Sicherheit verantwortlich. Aventicum Quest haftet nicht für Unfälle, Verletzungen oder Schäden, die während des Spiels auftreten.',
      'cgv-a7-p2':     'Bei Gewitter wird vom Spiel abgeraten. Minderjährige Teilnehmer müssen von einem verantwortlichen Erwachsenen begleitet werden.',
      'cgv-a8-h':      'Art. 8 — Geistiges Eigentum',
      'cgv-a8-p':      'Der gesamte Spielinhalt (Texte, Rätsel, Illustrationen, Benutzeroberfläche) ist ausschliessliches Eigentum von Aventicum Quest. Jede auch teilweise Vervielfältigung ist ohne vorherige Genehmigung untersagt.',
      'cgv-a9-h':      'Art. 9 — Personendaten',
      'cgv-a9-p':      'Die Bearbeitung von Personendaten ist in unserer <a href="confidentialite.html">Datenschutzerklärung</a> beschrieben.',
      'cgv-a10-h':     'Art. 10 — Anwendbares Recht und Streitigkeiten',
      'cgv-a10-p':     'Diese Bedingungen unterliegen dem schweizerischen Recht. Für jede Streitigkeit sind ausschliesslich die Gerichte des Kantons Waadt zuständig, unter Vorbehalt einer Beschwerde beim Bundesgericht.',
      'cgv-a11-h':     'Art. 11 — Kontakt',
      'cgv-a11-p':     'Bei Fragen zu einer Bestellung:<br><a href="mailto:info@aventicumquest.ch">info@aventicumquest.ch</a>',

      'conf-title':    'Datenschutzerklärung',
      'conf-h1':       'Verantwortlicher für die Bearbeitung',
      'conf-p1a':      '<strong>Aventicum Quest</strong>, betrieben von Bjorn Vollenweider, 1580 Avenches, Schweiz.<br>Kontakt: <a href="mailto:info@aventicumquest.ch">info@aventicumquest.ch</a>',
      'conf-p1b':      'Diese Erklärung gilt für die Website aventicumquest.ch und das Spiel Aventicum Quest — Operatio Aquila. Sie entspricht dem schweizerischen Bundesgesetz über den Datenschutz (revidiertes DSG, in Kraft seit September 2023) und, soweit anwendbar, der Datenschutz-Grundverordnung (DSGVO).',
      'conf-h2':       'Erhobene Daten und Zwecke',
      'conf-h2a':      'Beim Kauf',
      'conf-p2a':      'Bei der Bestellung eines Zugangscodes werden folgende Daten erhoben:',
      'conf-ul2a':     '<li>E-Mail-Adresse (erforderlich für die Übermittlung des Codes)</li><li>Zahlungsdaten (ausschliesslich bearbeitet durch <strong>Stripe, Inc.</strong> — Aventicum Quest hat niemals Zugriff auf Ihre Kartennummern)</li>',
      'conf-p2b':      'Rechtsgrundlage: Erfüllung eines Vertrags (Art. 31 Abs. 2 lit. a DSG).',
      'conf-h2b':      'Bei der Nutzung des Spiels',
      'conf-p2c':      'Der Spielfortschritt wird lokal auf Ihrem Gerät gespeichert (localStorage). Es werden keine Spieldaten an unsere Server übermittelt.',
      'conf-h2c':      'Cookies und Tracker',
      'conf-p2d':      'Die Website verwendet ausschliesslich funktionale Cookies (Speicherung Ihrer Cookie-Einwilligung). Ohne Ihre ausdrückliche Zustimmung werden keine Werbe- oder Profiling-Cookies gesetzt. Sie können Ihre Einstellungen jederzeit über das bei Ihrem ersten Besuch angezeigte Einwilligungsbanner ändern.',
      'conf-h3':       'Aufbewahrungsdauer',
      'conf-ul3':      '<li>Bestelldaten (E-Mail, Zahlungsreferenz): <strong>10 Jahre</strong> gemäss den schweizerischen Buchführungspflichten aufbewahrt (Art. 958f OR)</li><li>Cookie-Einstellungen: aufbewahrt, bis Sie Ihre Browserdaten löschen</li>',
      'conf-h4':       'Weitergabe der Daten',
      'conf-p4':       'Ihre Daten werden niemals an Dritte verkauft oder vermietet. Sie können weitergegeben werden an:',
      'conf-ul4':      '<li><strong>Stripe, Inc.</strong> — Zahlungsabwicklung (Datenschutzerklärung: stripe.com/privacy)</li><li><strong>GitHub, Inc.</strong> — Website-Hosting über GitHub Pages (Erklärung: docs.github.com/privacy)</li>',
      'conf-p4b':      'Diese Auftragsbearbeiter unterliegen vertraglichen Datenschutzpflichten gemäss dem anwendbaren Recht.',
      'conf-h5':       'Übermittlungen ausserhalb der Schweiz',
      'conf-p5':       'Stripe und GitHub sind US-amerikanische Unternehmen. Die Übermittlungen sind durch Standardvertragsklauseln oder durch die von der Schweiz anerkannte Angemessenheit abgesichert.',
      'conf-h6':       'Ihre Rechte',
      'conf-p6a':      'Gemäss dem DSG stehen Ihnen folgende Rechte zu:',
      'conf-ul6':      '<li>Recht auf Auskunft über Ihre Personendaten</li><li>Recht auf Berichtigung unrichtiger Daten</li><li>Recht auf Löschung (im Rahmen der gesetzlichen Aufbewahrungspflichten)</li><li>Recht auf Datenübertragbarkeit</li><li>Recht auf Widerspruch gegen die Bearbeitung</li>',
      'conf-p6b':      'Um diese Rechte auszuüben, kontaktieren Sie: <a href="mailto:info@aventicumquest.ch">info@aventicumquest.ch</a>',
      'conf-p6c':      'Wenn Sie der Ansicht sind, dass Ihre Rechte nicht gewahrt werden, können Sie eine Beschwerde beim <strong>Eidgenössischen Datenschutz- und Öffentlichkeitsbeauftragten (EDÖB)</strong> einreichen — <a href="https://www.edoeb.admin.ch" target="_blank" rel="noopener">www.edoeb.admin.ch</a>',
      'conf-h7':       'Sicherheit',
      'conf-p7':       'Die Website wird ausschliesslich über HTTPS ausgeliefert. Es werden keine Zahlungsdaten über unsere Server übertragen oder darauf gespeichert. Die Erzeugung und Verteilung der Codes werden sicher von Stripe abgewickelt.',
      'conf-h8':       'Änderungen',
      'conf-p8':       'Diese Erklärung kann aktualisiert werden. Das Datum der letzten Überarbeitung ist oben auf der Seite angegeben. Bei wesentlichen Änderungen wird auf der Website darüber informiert.'
    }
  };

  /* ── Application de la langue ─────────────────────────────── */
  const page = window.AQ_PAGE || 'ml';

  function setLang(lang) {
    if (!T[lang]) return;
    const dict = T[lang];

    // Selector display
    document.querySelectorAll('.lang-current').forEach(el => el.textContent = lang.toUpperCase());
    document.querySelectorAll('.lang-opt').forEach(opt => {
      opt.setAttribute('aria-selected', opt.getAttribute('data-lang') === lang ? 'true' : 'false');
    });

    // Text + HTML content
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) el.textContent = dict[key];
    });
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      if (dict[key] !== undefined) el.innerHTML = dict[key];
    });

    // Document language + title
    document.documentElement.lang = lang;
    const titles = PAGE_TITLES[page] || PAGE_TITLES.ml;
    document.title = titles[lang] || titles.fr;

    localStorage.setItem('aq-lang', lang);
  }
  window.setLang = setLang;

  /* ── Wiring on load ──────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    // Nav is always in its "scrolled" state on legal pages
    const nav = document.getElementById('nav');
    if (nav) nav.classList.add('scrolled');

    // Dropdown open / close
    document.querySelectorAll('.lang-select').forEach(sel => {
      const toggle = sel.querySelector('.lang-toggle');
      toggle.addEventListener('click', e => {
        e.stopPropagation();
        const open = sel.classList.toggle('open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    });
    function closeLangMenus() {
      document.querySelectorAll('.lang-select.open').forEach(sel => {
        sel.classList.remove('open');
        sel.querySelector('.lang-toggle').setAttribute('aria-expanded', 'false');
      });
    }
    document.addEventListener('click', closeLangMenus);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLangMenus(); });

    // Apply saved language
    const savedLang = localStorage.getItem('aq-lang') || 'fr';
    setLang(savedLang);
  });
})();
