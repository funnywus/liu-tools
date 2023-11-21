pipeline {
    agent any

    // PROJECT_NAME: 项目名
    // SSH_TARGET_DIR: 上传至服务器的文件夹
    // SSH_NAME: 用的服务器名

    stages {
        stage('拉取Git代码') {
            steps {
                echo "\n--------------- 拉取Git代码 ${PROJECT_NAME} start ---------------\n"
                checkout([$class: 'GitSCM', branches: [[name: "*/${branch}"]], extensions: [], userRemoteConfigs: [[credentialsId: "jenkins068a308f705c76e6517f323ba4812b05", url: "https://gitee.com/funnywuss/${PROJECT_NAME}.git"]]])
                echo "\n--------------- 拉取Git代码 end ---------------\n"
            }
        }

        stage('npm打包构建') {
            steps {
                echo "\n--------------- npm打包构建 start ---------------\n"
                // npm 编译安装
                // sh 'npm install && npm run build'
                sh '''
                    /usr/local/node/node_global/bin/cnpm install
                    npm run build
                    mv dist ${PROJECT_NAME}
                '''
                echo "\n--------------- npm打包构建 end ---------------\n"
            }
        }

        stage ("压缩") {
            steps {
                echo "\n--------------- 压缩包 start ---------------\n"
                sh  '''
                    rm -rf ./${PROJECT_NAME}.tar.gz
                    tar -zcvf ./${PROJECT_NAME}.tar.gz ./${PROJECT_NAME}
                '''
                 echo "\n--------------- 压缩包 end ---------------\n"
            }
        }

        stage ("部署服务器") {
            steps {
                echo "\n--------------- 部署服务器 start ---------------\n"
                sshPublisher(publishers: [sshPublisherDesc(configName: "$SSH_NAME", transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: '''cd ${SSH_TARGET_DIR}
tar -xvf ${PROJECT_NAME}.tar.gz -C ${SSH_TARGET_DIR}/''', execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '/${SSH_TARGET_DIR}', remoteDirectorySDF: false, removePrefix: '', sourceFiles: '**/*.tar.gz')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: true)])
                echo "\n--------------- 部署服务器 end ---------------\n"
            }
        }

    }
}
