Error: EMFILE: too many open files, watch
    at FSEvent.FSWatcher._handle.onchange (node:internal/fs/watchers:207:21

watchman watch-del-all

## [ Build Android ]

npx expo prebuild -p android --clean

## java 버전 관리 및 키 관리 (android/gradle.properties)

my-release-key.keystore 만들고 android/app/쪽으로 이동

org.gradle.java.home=/Users/a202205037/Library/Java/JavaVirtualMachines/corretto-17.0.13/Contents/Home

MYAPP_UPLOAD_STORE_FILE=my-release-key.keystore
MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
MYAPP_UPLOAD_STORE_PASSWORD=?
MYAPP_UPLOAD_KEY_PASSWORD=?

## 키 관리 (android/app/build.gradle)

signingConfigs {
    debug {
        storeFile file('debug.keystore')
        storePassword 'android'
        keyAlias 'androiddebugkey'
        keyPassword 'android'
    }
    release {
        if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
            storeFile file(MYAPP_UPLOAD_STORE_FILE)
            storePassword MYAPP_UPLOAD_STORE_PASSWORD
            keyAlias MYAPP_UPLOAD_KEY_ALIAS
            keyPassword MYAPP_UPLOAD_KEY_PASSWORD
        }
    }
}
buildTypes {
    debug {
        signingConfig signingConfigs.debug
    }
    release {
        signingConfig signingConfigs.release
        minifyEnabled enableProguardInReleaseBuilds
        proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
    }
}

## 프로젝트 설정 앱푸시 (android/app/build.gradle, android/build.gradle)

[ goole-services.json 파일 생성 ]
Firebase Console 에서 프로젝트 생성 후 설정 후 다운로드

[ android/build.gradle ]

- com.google.gms:google-services:4.3.15 설정

buildscript {
    ext {
        ...
    }
    repositories {
        ...
    }
    dependencies {
        ...
        classpath('com.google.gms:google-services:4.3.15')
    }
}

[ android/app/build.gradle ]

apply plugin: "com.android.application"
apply plugin: "org.jetbrains.kotlin.android"
apply plugin: "com.facebook.react"
apply plugin: 'com.google.gms.google-services'

## sdk 관리 (android/local.properties)

## This file must *NOT* be checked into Version Control Systems,
# as it contains information specific to your local configuration.
#
# Location of the SDK. This is only used by Gradle.
# For customization when using a Version Control System, please read the
# header note.
sdk.dir=/Users/.../Library/Android/sdk
ndk.dir=/Users/.../Library/Android/sdk/ndk/25.1.8937393

cd android
./gradlew clean
./gradlew assembleRelease
