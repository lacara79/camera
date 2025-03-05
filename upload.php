<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Ajuste para o domínio do app em produção
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Configurações
$uploadDir = 'uploads/'; // Pasta onde as fotos serão salvas
$allowedTypes = ['image/jpeg', 'image/png', 'image/gif']; // Tipos permitidos
$maxSize = 5 * 1024 * 1024; // 5MB em bytes

// Resposta padrão
$response = [
    'success' => false,
    'message' => '',
    'file' => null
];

// Verifica se o método é POST e se há arquivo enviado
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['file'])) {
    $file = $_FILES['file'];
    $fileName = basename($file['name']);
    $fileTmpName = $file['tmp_name'];
    $fileSize = $file['size'];
    $fileType = mime_content_type($fileTmpName);
    $fileError = $file['error'];

    // Cria a pasta de upload se não existir
    if (!file_exists($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    // Validações
    if ($fileError !== UPLOAD_ERR_OK) {
        $response['message'] = 'Erro ao enviar o arquivo.';
    } elseif (!in_array($fileType, $allowedTypes)) {
        $response['message'] = 'Tipo de arquivo não permitido.';
    } elseif ($fileSize > $maxSize) {
        $response['message'] = 'Arquivo excede o tamanho máximo de 5MB.';
    } else {
        // Gera um nome único para evitar conflitos
        $newFileName = uniqid() . '-' . $fileName;
        $destination = $uploadDir . $newFileName;

        // Move o arquivo para o destino
        if (move_uploaded_file($fileTmpName, $destination)) {
            $response['success'] = true;
            $response['message'] = 'Upload realizado com sucesso!';
            $response['file'] = $newFileName;
        } else {
            $response['message'] = 'Falha ao salvar o arquivo.';
        }
    }
} else {
    $response['message'] = 'Nenhum arquivo enviado ou método inválido.';
}

// Retorna a resposta em JSON
echo json_encode($response);
?>