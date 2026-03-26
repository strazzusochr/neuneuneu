# 🧪 Google Colab Setup (Rendering & Compute)

Für das **Corona Control Ultimate** Projekt kannst du Google Colab nutzen, um rechenintensive Aufgaben (z. B. 3D-Baking oder Simulationen) auf kostenlosen NVIDIA-GPUs auszuführen.

## 🚀 Schritte zum Starten

1. **GitHub Repository klonen**:
   Öffne ein neues Notebook in Colab und führe folgenden Befehl aus:
   ```python
   !git clone https://github.com/DEIN_USER/newwebgame.git
   %cd newwebgame
   ```

2. **Node.js & Dependencies installieren**:
   Colab hat Node.js vorinstalliert, aber wir benötigen die Projekt-Abhängigkeiten:
   ```python
   !npm install
   ```

3. **Build für Produktion**:
   Erstelle das optimierte Frontend-Bundle:
   ```python
   !npm run build
   ```

4. **Remote Tunneling (Optional)**:
   Um die Web-App direkt aus Colab heraus im Browser zu sehen, kannst du `localtunnel` nutzen:
   ```python
   !npx localtunnel --port 8081
   ```

## 🛠️ Warum Google Colab?
- **Kostenlose GPU**: Zugriff auf Tesla T4 oder L4 GPUs.
- **VRAM**: 16 GB VRAM für komplexe Shader-Berechnungen.
- **WebGPU-Testing**: Du kannst in Colab-Umgebungen WebGPU-Shader-Tests durchführen, indem du Chromium mit `--enable-unsafe-webgpu` startest (erfordert X11 Forwarding).

## ⚠️ Einschränkungen
- Colab-Instanzen werden nach Inaktivität beendet.
- Nicht für dauerhaftes Hosting geeignet (dafür Oracle Free Tier nutzen).
