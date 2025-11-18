pipeline {
    agent any

    stages {

        stage('Clonar Repositorio') {
            steps {
                git branch: 'main', url: 'https://github.com/cristianrincon07/Proyecto-Integracion-Continua'
            }
        }

        stage('Construir y Levantar Servicios') {
            steps {
                sh 'docker-compose down || true'
                sh 'docker-compose pull'
                sh 'docker-compose up -d'
            }
        }

        stage('Verificar Servicios') {
            steps {
                sh "docker ps"
            }
        }
    }

    post {
        failure {
            echo "❌ Error en el pipeline"
        }
        success {
            echo "✅ Pipeline ejecutado correctamente"
        }
    }
}
