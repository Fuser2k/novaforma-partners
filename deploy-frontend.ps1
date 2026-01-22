$ServerIP = "162.55.168.224"
$User = "olcay"
$RemotePath = "/home/olcay/zorgforma-frontend"
$BuildDir = "dist_frontend_deploy"
$ZipFile = "frontend-deploy.zip"
$ScriptFile = "deploy-frontend-script.sh"

Write-Host "Deploying Zorgforma Frontend to $ServerIP..." -ForegroundColor Cyan

# 0. Clean up
if (Test-Path $ZipFile) { Remove-Item $ZipFile -Force -ErrorAction SilentlyContinue }
if (Test-Path $BuildDir) { Remove-Item $BuildDir -Recurse -Force -ErrorAction SilentlyContinue; Start-Sleep -Seconds 1 }

# 1. Prepare Directory
Write-Host "Creating build directory..."
New-Item -ItemType Directory -Path $BuildDir -Force | Out-Null

Write-Host "Preparing files (skipping node_modules and backend)..."
try {
    # Root config files
    Copy-Item "package.json" -Destination $BuildDir
    Copy-Item "package-lock.json" -Destination $BuildDir
    Copy-Item "Dockerfile" -Destination $BuildDir
    Copy-Item "frontend-docker-compose.yml" -Destination $BuildDir
    
    # Next.js config files (add others if they exist like tailwind.config.js)
    if (Test-Path "next.config.ts") { Copy-Item "next.config.ts" -Destination $BuildDir }
    if (Test-Path "tsconfig.json") { Copy-Item "tsconfig.json" -Destination $BuildDir }
    if (Test-Path "next-env.d.ts") { Copy-Item "next-env.d.ts" -Destination $BuildDir }
    if (Test-Path "postcss.config.mjs") { Copy-Item "postcss.config.mjs" -Destination $BuildDir }
    if (Test-Path "eslint.config.mjs") { Copy-Item "eslint.config.mjs" -Destination $BuildDir }
    if (Test-Path "components.json") { Copy-Item "components.json" -Destination $BuildDir }

    # Directories
    Copy-Item "src" -Destination $BuildDir -Recurse
    Copy-Item "public" -Destination $BuildDir -Recurse
}
catch {
    Write-Host "Error copying files: $_" -ForegroundColor Red
    exit
}

# 2. Zip
Write-Host "Zipping deploy package..."
Start-Sleep -Seconds 2
try {
    Compress-Archive -Path "$BuildDir/*" -DestinationPath $ZipFile -Force
}
catch {
    Write-Host "Error Zipping: $_" -ForegroundColor Red
    exit
}

# Cleanup temp
Remove-Item $BuildDir -Recurse -Force -ErrorAction SilentlyContinue

# 3. Upload
Write-Host "Uploading artifact to server ($ServerIP)..."
Write-Host "You may be prompted for the '$User' password (twice: once for zip, once for script)." -ForegroundColor Yellow

# Upload Zip
scp $ZipFile ${User}@${ServerIP}:/home/${User}/$ZipFile
if ($LASTEXITCODE -ne 0) {
    Write-Host "SCP Zip Failed." -ForegroundColor Red
    exit
}

# Upload Script
scp $ScriptFile ${User}@${ServerIP}:/home/${User}/$ScriptFile
if ($LASTEXITCODE -ne 0) {
    Write-Host "SCP Script Failed." -ForegroundColor Red
    exit
}

# 4. SSH and Execute
Write-Host "Connecting to server to launch deployment script..."
# Fix line endings and execute
ssh -t ${User}@${ServerIP} "chmod +x /home/${User}/$ScriptFile && sed -i 's/\r$//' /home/${User}/$ScriptFile && bash /home/${User}/$ScriptFile"

Write-Host "--------------------------------------------------------" -ForegroundColor Green
Write-Host "Frontend Deployment Complete!" -ForegroundColor Green
Write-Host "Frontend should be available at: http://$ServerIP:3001" -ForegroundColor Cyan
Write-Host "First time build takes a few minutes!" -ForegroundColor Yellow
Write-Host "--------------------------------------------------------"
