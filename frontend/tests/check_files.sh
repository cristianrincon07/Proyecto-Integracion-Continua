#!/bin/sh

echo "🔍 Ejecutando pruebas automáticas del frontend..."

# 1. Verificar archivos esenciales
echo "➡ Verificando existencia de archivos..."
[ -f index.html ] || { echo "❌ ERROR: Falta index.html"; exit 1; }
[ -f styles.css ] || { echo "❌ ERROR: Falta styles.css"; exit 1; }
[ -f app.js ] || { echo "❌ ERROR: Falta app.js"; exit 1; }

echo "✔ Archivos verificados correctamente."

# 2. Validar sintaxis de JavaScript
echo "➡ Revisando sintaxis de app.js..."

node -c app.js 2>/tmp/js_error.log
if [ $? -ne 0 ]; then
    echo "❌ ERROR DE SINTAXIS en app.js:"
    cat /tmp/js_error.log
    exit 1
fi

echo "✔ Sintaxis JS correcta."

# 3. Validación HTML mínima (chequeo simple)
echo "➡ Validando estructura básica del HTML..."

grep -qi "<html" index.html || { echo "❌ ERROR: index.html no contiene <html>"; exit 1; }
grep -qi "<body" index.html || { echo "❌ ERROR: index.html no contiene <body>"; exit 1; }

echo "✔ HTML válido."

echo "🎉 TODAS LAS PRUEBAS PASARON EXITOSAMENTE!"
exit 0
