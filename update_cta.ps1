$html = [System.IO.File]::ReadAllText("\\wsl.localhost\Ubuntu\home\yetionions\mywebsite\index.html", [System.Text.Encoding]::UTF8)

$newCta = @"
    <section id="cta-combined" class="cta-combined">
        <div class="container">
            <div class="cta-row">
                <div id="final-cta" class="final-cta cta-card">
                    <h2>Ready to Upgrade Your Gardyn Home?</h2>
                    <p>Get your custom trellis kit today and take your indoor garden to the next level.</p>
                    <button class="buy-now-btn cta-shop-btn">Shop Now</button>
                </div>
                <div id="etsy-cta" class="etsy-cta cta-card">
                    <p>Want to check out our Etsy store?</p>
                    <a href="https://www.etsy.com/shop/VetROponicsSystems?ref=shop-header-name&listing_id=4406810128&from_page=listing" target="_blank" rel="noopener noreferrer" class="buy-now-btn">Click Me</a>
                </div>
            </div>
        </div>
    </section>
"@

# Use regex to replace both sections
$pattern = '(?s)\s+<section id="final-cta".*?</section>\s+<section id="etsy-cta".*?</section>'
$result = [regex]::Replace($html, $pattern, "`n$newCta")

[System.IO.File]::WriteAllText("\\wsl.localhost\Ubuntu\home\yetionions\mywebsite\index.html", $result, [System.Text.Encoding]::UTF8)
Write-Host "Done. Contains cta-combined: $($result.Contains('cta-combined'))"
