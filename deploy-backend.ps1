$ServerIP = "162.55.168.224"
$User = "olcay"
$RemotePath = "/home/olcay/zorgforma-backend"
$BuildDir = "dist_backend_deploy"
$ZipFile = "backend-deploy.zip"

Write-Host "Deploying Zorgforma Backend to $ServerIP..." -ForegroundColor Cyan

# 0. Clean up any previous runs forcefully
if (Test-Path $ZipFile) { Remove-Item $ZipFile -Force -ErrorAction SilentlyContinue }
if (Test-Path $BuildDir) { 
    Write-Host "Cleaning up previous build directory..."
    Remove-Item $BuildDir -Recurse -Force -ErrorAction SilentlyContinue
    Start-Sleep -Seconds 1
}

# 1. Prepare clean build directory
Write-Host "Creating build directory..."
New-Item -ItemType Directory -Path $BuildDir -Force | Out-Null

Write-Host "Preparing files (skipping node_modules)..."
# Copy files manually to exclude node_modules
# Using simple Copy-Item. If specific files fail, we catch it.
try {
    Copy-Item "backend/package.json" -Destination $BuildDir
    Copy-Item "backend/package-lock.json" -Destination $BuildDir
    Copy-Item "backend/Dockerfile" -Destination $BuildDir
    Copy-Item "backend/docker-compose.yml" -Destination $BuildDir
    Copy-Item "backend/favicon.png" -Destination $BuildDir
    Copy-Item "backend/tsconfig.json" -Destination $BuildDir

    # Copy Directories
    Copy-Item "backend/config" -Destination $BuildDir -Recurse
    Copy-Item "backend/public" -Destination $BuildDir -Recurse
    Copy-Item "backend/src" -Destination $BuildDir -Recurse
    Copy-Item "backend/types" -Destination $BuildDir -Recurse
}
catch {
    Write-Host "Error copying files: $_" -ForegroundColor Red
    exit
}

# 2. Zip
Write-Host "Zipping deploy package (this works better if no files are locked)..."
# Add a small delay to ensure file handles are released
Start-Sleep -Seconds 2

try {
    Compress-Archive -Path "$BuildDir/*" -DestinationPath $ZipFile -Force
}
catch {
    Write-Host "Error Zipping: $_" -ForegroundColor Red
    Write-Host "Please ensure no files in 'backend' folder are open in other apps." -ForegroundColor Yellow
    exit
}

# Cleanup temp dir (Optional, if it fails we just warn but continue)
try {
    Remove-Item $BuildDir -Recurse -Force -ErrorAction SilentlyContinue
} catch {
    Write-Host "Warning: Could not fully clean up temp dir, but continuing deployment..." -ForegroundColor Yellow
}

# 3. Copy files to server
if (-not (Test-Path $ZipFile)) {
    Write-Host "Error: Zip file was not created." -ForegroundColor Red
    exit
}

Write-Host "Uploading artifact to server ($ServerIP)..."
Write-Host "You may be prompted for the '$User' password (twice: once for zip, once for script)." -ForegroundColor Yellow

# Upload Zip
scp $ZipFile ${User}@${ServerIP}:/home/${User}/$ZipFile
if ($LASTEXITCODE -ne 0) {
    Write-Host "SCP Zip Failed." -ForegroundColor Red
    exit
}

# Upload Script
$ScriptFile = "deploy-script.sh"
scp $ScriptFile ${User}@${ServerIP}:/home/${User}/$ScriptFile
if ($LASTEXITCODE -ne 0) {
    Write-Host "SCP Script Failed." -ForegroundColor Red
    exit
}

# 4. SSH and Execute
Write-Host "Connecting to server to launch deployment script..."
# We use tr -d '\r' to fix Windows line endings just in case scp didn't handle it
ssh -t ${User}@${ServerIP} "chmod +x /home/${User}/$ScriptFile && sed -i 's/\r$//' /home/${User}/$ScriptFile && bash /home/${User}/$ScriptFile"

Write-Host "--------------------------------------------------------" -ForegroundColor Green
Write-Host "Deployment Complete!" -ForegroundColor Green
Write-Host "Backend should be available at: http://$ServerIP:1337/admin" -ForegroundColor Cyan
Write-Host "--------------------------------------------------------"

Write-Host "--------------------------------------------------------" -ForegroundColor Green
Write-Host "Deployment Complete!" -ForegroundColor Green
Write-Host "Backend should be available at: http://$ServerIP:1337/admin" -ForegroundColor Cyan
Write-Host "First time build may take a few minutes."
Write-Host "--------------------------------------------------------"
