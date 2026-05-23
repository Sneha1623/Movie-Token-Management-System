# Movie Token Management - Sync Script
$SourceDirs = @("html", "css", "js", "images")
$DestDir = "www"

Write-Host "Starting Sync Process..."

if (-not (Test-Path $DestDir)) {
    New-Item -ItemType Directory -Path $DestDir
}

Copy-Item "index.html" "$DestDir/index.html" -Force

foreach ($dir in $SourceDirs) {
    if (Test-Path $dir) {
        if (-not (Test-Path "$DestDir/$dir")) {
            New-Item -ItemType Directory -Path "$DestDir/$dir"
        }
        Copy-Item -Path "$dir/*" -Destination "$DestDir/$dir" -Recurse -Force
        Write-Host "✅ Copied $dir folder"
    }
}

Write-Host "Sync Complete!"
