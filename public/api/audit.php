<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=UTF-8');

$rawBody = file_get_contents('php://input');
$payload = json_decode($rawBody, true);

if (!is_array($payload) || empty($payload['url'])) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Missing url parameter.',
    ]);
    exit;
}

$url = trim((string) $payload['url']);
if (!filter_var($url, FILTER_VALIDATE_URL)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Please enter a valid URL (including http:// or https://).',
    ]);
    exit;
}

$startTime = microtime(true);

$ch = curl_init($url);
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_TIMEOUT => 12,
    CURLOPT_CONNECTTIMEOUT => 8,
    CURLOPT_USERAGENT => 'Mowglai-Audit-Bot/1.0',
    CURLOPT_HEADER => true,
    CURLOPT_SSL_VERIFYPEER => true,
    CURLOPT_SSL_VERIFYHOST => 2,
]);

$response = curl_exec($ch);
$curlErr = curl_error($ch);
$statusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$headerSize = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
curl_close($ch);

if ($response === false || $statusCode < 200 || $statusCode >= 400) {
    http_response_code(400);
    $message = $curlErr ?: ('Failed to fetch URL: HTTP ' . $statusCode);
    echo json_encode([
        'url' => $url,
        'success' => false,
        'error' => $message,
        'timestamp' => gmdate('c'),
    ]);
    exit;
}

$headersRaw = substr($response, 0, $headerSize);
$html = substr($response, $headerSize);

$headers = [];
$headerLines = preg_split("/\r\n|\n|\r/", $headersRaw);
foreach ($headerLines as $line) {
    if (strpos($line, ':') !== false) {
        [$key, $value] = array_map('trim', explode(':', $line, 2));
        $headers[strtolower($key)] = $value;
    }
}

$loadTimeMs = (int) round((microtime(true) - $startTime) * 1000);

$isSSL = str_starts_with($url, 'https://');
$hsts = $headers['strict-transport-security'] ?? null;
$xContentType = $headers['x-content-type-options'] ?? null;

$emailRegex = '/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/i';
preg_match_all($emailRegex, $html, $emailsFound);
$uniqueEmails = array_unique($emailsFound[0] ?? []);

preg_match('/<title[^>]*>([^<]+)<\/title>/i', $html, $titleMatch);
$title = $titleMatch[1] ?? null;

preg_match("/<meta\\s+name=[\"']description[\"']\\s+content=[\"']([^\"']*)[\"']/i", $html, $descMatch);
$description = $descMatch[1] ?? null;

preg_match_all('/<h1[^>]*>([^<]+)<\/h1>/i', $html, $h1Matches);

preg_match("/<link\\s+rel=[\"']canonical[\"']\\s+href=[\"']([^\"']*)[\"']/i", $html, $canonicalMatch);
$canonical = $canonicalMatch[1] ?? null;

$viewportMatch = preg_match("/<meta\\s+name=[\"']viewport[\"'][^>]*>/i", $html);

preg_match("/<html[^>]+lang=[\"']([^\"']+)[\"'][^>]*>/i", $html, $langMatch);
$lang = $langMatch[1] ?? null;

preg_match("/<meta\\s+charset=[\"']([^\"']+)[\"'][^>]*>/i", $html, $charsetMatch);
$charset = $charsetMatch[1] ?? null;

preg_match("/<link\\s+rel=[\"'](?:shortcut )?icon[\"'][^>]+href=[\"']([^\"']+)[\"'][^>]*>/i", $html, $faviconMatch);
$favicon = $faviconMatch[1] ?? null;

$wordCount = count(preg_split('/\s+/', strip_tags($html)));

preg_match_all('/<img[^>]+>/i', $html, $imgMatches);
$imageCount = count($imgMatches[0] ?? []);
preg_match_all("/<img[^>]+alt=[\"']([^\"']+)[\"'][^>]*>/i", $html, $altMatches);
$imagesWithAlt = count($altMatches[0] ?? []);

$ogTitle = preg_match("/<meta\\s+property=[\"']og:title[\"']/i", $html);
$ogImage = preg_match("/<meta\\s+property=[\"']og:image[\"']/i", $html);

$scriptCount = preg_match_all('/<script/i', $html);
$cssCount = preg_match_all("/<link\\s+rel=[\"']stylesheet[\"']/i", $html);

$seoScore = 0;
$seoItems = [];

if ($title) {
    $seoScore += 15;
    $seoItems[] = [
        'title' => 'Page Title',
        'status' => 'pass',
        'value' => 'Found',
        'description' => 'Your page has a title tag. This is the first thing users see in search results.',
    ];
} else {
    $seoItems[] = [
        'title' => 'Page Title',
        'status' => 'fail',
        'value' => 'Missing',
        'description' => 'Your page is missing a title tag.',
        'recommendation' => 'Add a descriptive title tag (<title>) to the <head> of your page.',
    ];
}

if ($description) {
    $seoScore += 15;
    $seoItems[] = [
        'title' => 'Meta Description',
        'status' => 'pass',
        'value' => 'Found',
        'description' => 'A summary of your page is present for search engines.',
    ];
} else {
    $seoItems[] = [
        'title' => 'Meta Description',
        'status' => 'fail',
        'value' => 'Missing',
        'description' => 'No summary found. Search engines will guess what your page is about.',
        'recommendation' => "Add a <meta name='description'> tag with a concise summary.",
    ];
}

if (!empty($h1Matches[0])) {
    $seoScore += 15;
    $seoItems[] = [
        'title' => 'Main Heading (H1)',
        'status' => 'pass',
        'value' => count($h1Matches[0]) . ' Found',
        'description' => 'Your page has a clear main topic heading.',
    ];
} else {
    $seoItems[] = [
        'title' => 'Main Heading (H1)',
        'status' => 'fail',
        'value' => 'Missing',
        'description' => 'No main heading found. It is hard to tell what the main topic is.',
        'recommendation' => 'Add one <h1> tag that describes the main content of the page.',
    ];
}

if ($viewportMatch) {
    $seoScore += 15;
    $seoItems[] = [
        'title' => 'Mobile Optimization',
        'status' => 'pass',
        'value' => 'Optimized',
        'description' => 'Your page is configured to scale correctly on mobile devices.',
    ];
} else {
    $seoItems[] = [
        'title' => 'Mobile Optimization',
        'status' => 'fail',
        'value' => 'Missing Viewport',
        'description' => 'This page might look broken on mobile phones.',
        'recommendation' => "Add a <meta name='viewport'> tag to ensure mobile responsiveness.",
    ];
}

if ($canonical) {
    $seoScore += 15;
    $seoItems[] = [
        'title' => 'Canonical Tag',
        'status' => 'pass',
        'value' => 'Found',
        'description' => 'You are preventing duplicate content issues correctly.',
    ];
} else {
    $seoScore += 10;
    $seoItems[] = [
        'title' => 'Canonical Tag',
        'status' => 'warning',
        'value' => 'Missing',
        'description' => 'Helps prevent duplicate content issues if your site is accessed via multiple URLs.',
        'recommendation' => "Add a <link rel='canonical'> tag.",
    ];
}

if ($lang) {
    $seoScore += 15;
    $seoItems[] = [
        'title' => 'Language Tag',
        'status' => 'pass',
        'value' => $lang,
        'description' => 'Search engines know the language of your content.',
    ];
} else {
    $seoItems[] = [
        'title' => 'Language Tag',
        'status' => 'fail',
        'value' => 'Missing',
        'description' => 'Search engines might guess the wrong language.',
        'recommendation' => "Add a 'lang' attribute to your <html> tag.",
    ];
}

if ($favicon) {
    $seoScore += 10;
    $seoItems[] = [
        'title' => 'Favicon',
        'status' => 'pass',
        'value' => 'Found',
        'description' => 'Brand icon found. Helps with recognition in browser tabs.',
    ];
} else {
    $seoItems[] = [
        'title' => 'Favicon',
        'status' => 'warning',
        'value' => 'Missing',
        'description' => 'No brand icon found.',
        'recommendation' => 'Add a favicon to look more professional.',
    ];
}

$perfScore = 0;
$perfItems = [];
$loadTimeSec = number_format($loadTimeMs / 1000, 2);

if ($loadTimeMs < 800) {
    $perfScore += 60;
    $perfItems[] = [
        'title' => 'Server Response Time',
        'status' => 'pass',
        'value' => $loadTimeSec . 's',
        'description' => 'Incredible! Your website server responds instantly.',
    ];
} elseif ($loadTimeMs < 2000) {
    $perfScore += 40;
    $perfItems[] = [
        'title' => 'Server Response Time',
        'status' => 'warning',
        'value' => $loadTimeSec . 's',
        'description' => 'Good, but could be faster. Aim for under 0.8 seconds.',
        'recommendation' => 'Optimize server cache or upgrade hosting.',
    ];
} else {
    $perfScore += 10;
    $perfItems[] = [
        'title' => 'Server Response Time',
        'status' => 'fail',
        'value' => $loadTimeSec . 's',
        'description' => 'Slow. Users may leave before the page loads.',
        'recommendation' => 'Critical: Investigate server response times.',
    ];
}

if ($scriptCount < 15) {
    $perfScore += 20;
    $perfItems[] = [
        'title' => 'JavaScript Bloat',
        'status' => 'pass',
        'value' => $scriptCount . ' scripts',
        'description' => 'Low code usage. Helps with faster rendering.',
    ];
} elseif ($scriptCount < 30) {
    $perfScore += 10;
    $perfItems[] = [
        'title' => 'JavaScript Bloat',
        'status' => 'warning',
        'value' => $scriptCount . ' scripts',
        'description' => 'Moderate amount of external code. Watch out for slowdowns.',
        'recommendation' => 'Combine or remove unnecessary script tags.',
    ];
} else {
    $perfItems[] = [
        'title' => 'JavaScript Bloat',
        'status' => 'fail',
        'value' => $scriptCount . ' scripts',
        'description' => 'High amount of third-party code. Likely slowing down your site.',
        'recommendation' => 'Audit and remove unused JavaScript libraries.',
    ];
}

if ($cssCount < 10) {
    $perfScore += 20;
    $perfItems[] = [
        'title' => 'CSS Requests',
        'status' => 'pass',
        'value' => $cssCount . ' files',
        'description' => 'Efficient styling structure.',
    ];
} else {
    $perfScore += 10;
    $perfItems[] = [
        'title' => 'CSS Requests',
        'status' => 'warning',
        'value' => $cssCount . ' files',
        'description' => 'Many separate style files. Each one delays rendering.',
        'recommendation' => 'Combine certain CSS files to reduce requests.',
    ];
}

$secScore = 0;
$secItems = [];

if ($isSSL) {
    $secScore += 40;
    $secItems[] = [
        'title' => 'SSL Certificate',
        'status' => 'pass',
        'value' => 'Active',
        'description' => 'Your site is secure. Data is encrypted specifically for your visitors.',
    ];
} else {
    $secItems[] = [
        'title' => 'SSL Certificate',
        'status' => 'fail',
        'value' => 'Missing',
        'description' => 'Not Secure. Browsers may warn users not to visit.',
        'recommendation' => 'Install an SSL certificate immediately (HTTPS).',
    ];
}

if ($hsts) {
    $secScore += 20;
    $secItems[] = [
        'title' => 'HSTS Header',
        'status' => 'pass',
        'value' => 'Active',
        'description' => 'You are enforcing secure connections strictly.',
    ];
} else {
    $secItems[] = [
        'title' => 'HSTS Header',
        'status' => 'warning',
        'value' => 'Missing',
        'description' => 'Strict-Transport-Security header is missing.',
        'recommendation' => 'Enable HSTS to prevent protocol downgrade attacks.',
    ];
}

if (strtolower((string) $xContentType) === 'nosniff') {
    $secScore += 20;
    $secItems[] = [
        'title' => 'MIME Sniffing Protection',
        'status' => 'pass',
        'value' => 'Active',
        'description' => 'Prevents browsers from incorrectly detecting file types.',
    ];
} else {
    $secItems[] = [
        'title' => 'MIME Sniffing Protection',
        'status' => 'warning',
        'value' => 'Missing',
        'description' => 'X-Content-Type-Options header is missing.',
        'recommendation' => "Add 'X-Content-Type-Options: nosniff' header.",
    ];
}

if (count($uniqueEmails) === 0) {
    $secScore += 20;
    $secItems[] = [
        'title' => 'Email Privacy',
        'status' => 'pass',
        'value' => 'Secure',
        'description' => 'No plain-text email addresses found. Good for spam prevention.',
    ];
} else {
    $secItems[] = [
        'title' => 'Email Privacy',
        'status' => 'warning',
        'value' => count($uniqueEmails) . ' Emails Exposed',
        'description' => 'Plain text emails found. Bots can scrape these for spam.',
        'recommendation' => 'Use contact forms or obfuscate email addresses.',
    ];
}

$contentScore = 0;
$contentItems = [];

if ($wordCount > 300) {
    $contentScore += 40;
    $contentItems[] = [
        'title' => 'Content Volume',
        'status' => 'pass',
        'value' => '~' . $wordCount . ' words',
        'description' => 'Good amount of text content for search engines to understand.',
    ];
} else {
    $contentScore += 20;
    $contentItems[] = [
        'title' => 'Content Volume',
        'status' => 'warning',
        'value' => '~' . $wordCount . ' words',
        'description' => 'Thin content. It is hard search engines to rank pages with little text.',
        'recommendation' => 'Add more descriptive text.',
    ];
}

$missingAlt = $imageCount - $imagesWithAlt;
if ($imageCount === 0) {
    $contentScore += 30;
    $contentItems[] = [
        'title' => 'Images',
        'status' => 'warning',
        'value' => 'None',
        'description' => 'Visuals help engagement, but you have none.',
        'recommendation' => 'Consider adding relevant images.',
    ];
} elseif ($missingAlt === 0) {
    $contentScore += 30;
    $contentItems[] = [
        'title' => 'Image Accessibility',
        'status' => 'pass',
        'value' => 'Perfect',
        'description' => 'All images have descriptions (Alt text). Great for accessibility.',
    ];
} else {
    $contentScore += 10;
    $contentItems[] = [
        'title' => 'Image Accessibility',
        'status' => 'warning',
        'value' => $missingAlt . ' missing descriptions',
        'description' => 'Some images are missing descriptions for screen readers.',
        'recommendation' => "Add 'alt' attributes to describe your images.",
    ];
}

if ($ogTitle && $ogImage) {
    $contentScore += 30;
    $contentItems[] = [
        'title' => 'Social Sharing',
        'status' => 'pass',
        'value' => 'Optimized',
        'description' => 'Your site looks good when shared on social media (Open Graph).',
    ];
} elseif ($ogTitle || $ogImage) {
    $contentScore += 15;
    $contentItems[] = [
        'title' => 'Social Sharing',
        'status' => 'warning',
        'value' => 'Partial',
        'description' => 'Partial social configuration found.',
        'recommendation' => 'Ensure both og:title and og:image tags are present.',
    ];
} else {
    $contentItems[] = [
        'title' => 'Social Sharing',
        'status' => 'fail',
        'value' => 'Missing',
        'description' => 'Links will look broken or empty when shared on social media.',
        'recommendation' => 'Add Open Graph (og:) meta tags.',
    ];
}

echo json_encode([
    'url' => $url,
    'success' => true,
    'timestamp' => gmdate('c'),
    'categories' => [
        'seo' => [
            'score' => max(0, min(100, $seoScore)),
            'title' => 'Search Visibility',
            'description' => 'How easily potential customers can find you on Google.',
            'items' => $seoItems,
        ],
        'performance' => [
            'score' => max(0, min(100, $perfScore)),
            'title' => 'Speed & Experience',
            'description' => 'How fast your site feels. Slow sites lose customers.',
            'items' => $perfItems,
        ],
        'security' => [
            'score' => max(0, min(100, $secScore)),
            'title' => 'Trust & Security',
            'description' => 'Is your site safe for visitors? Essential for trust.',
            'items' => $secItems,
        ],
        'content' => [
            'score' => max(0, min(100, $contentScore)),
            'title' => 'Content Health',
            'description' => 'Does your content follow best practices for engagement?',
            'items' => $contentItems,
        ],
    ],
]);
