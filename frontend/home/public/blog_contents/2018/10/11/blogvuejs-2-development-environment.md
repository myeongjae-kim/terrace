# [Blog/VueJS] 2. 개발환경 세팅

운영체제는 CentOS를 사용하고 Desktop Environment는 Gnome Desktop을 쓸 것입니다. 코드 편집기는 Visual Studio Code입니다. 

CentOS를 고른 이유는 AWS EC2에서 쓸 Amazon Linux가 RHEL(Red Hat Enterprise Linux) 기반이기 때문입니다. CentOS는 RHEL에서 로고만 바꾼 운영체제입니다.

Visual Studio Code는 맥, 윈도우, 리눅스에서 동일한 UI/UX를 제공합니다.

추천하는 확장 프로그램은 다음과 같습니다.

- [Go](https://marketplace.visualstudio.com/items?itemName=ms-vscode.Go)
- [Markdown Preview Enhanced](https://marketplace.visualstudio.com/items?itemName=shd101wyy.markdown-preview-enhanced)
- [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur)
- [Vim](https://marketplace.visualstudio.com/items?itemName=vscodevim.vim)(익숙하신 분들만)

### 운영체제 설치
Virtualbox에 CentOS 7.5.1804 버전을 설치합니다.

- [Virtualbox 다운로드](https://www.virtualbox.org/wiki/Downloads)
- [CentOS 7.5.1804 DVD Image 다운로드](http://isoredirect.centos.org/centos/7/isos/x86_64/CentOS-7-x86_64-DVD-1804.iso)

[이 글]( https://www.instructables.com/id/How-to-install-Linux-on-your-Windows/ 
)을 참고해서 CentOS를 설치합니다. Version은 `Ubuntu` 대신 `Red Hat (64-bit)`을 선택합니다.

`Setting - Storage - Controller: IDE - Empty`를 선택한 뒤 우측에 디스크를 클릭해 이전에 다운받은 `CentOS-7-x86_64-DVD-1804.iso`를 선택합니다.

![Red Hat (64-bit)을 선택합니다](https://cdn.myeongjae.kim/blog/2018/10/vbox-os-version.png){.no-shadow}


![CentOS DVD Image를 선택합니다](https://cdn.myeongjae.kim/blog/2018/10/choose-centos-iso.png){.no-shadow}

설치 중 세팅은 다음과 같이 합니다.

![Settings](https://cdn.myeongjae.kim/blog/2018/10/initial-settings.png){.no-shadow}

![Software Selection에서 GNOME Desktop을 선택합니다](https://cdn.myeongjae.kim/blog/2018/10/choose-gnome.png){.no-shadow}

- Date & TIme: Asia/Seoul
- Keyboard: Korean (remove english)
- Software Selection: GNOME Desktop

파티션 설정하라고 경고가 나올 텐데, Installation Destination을 클릭해서 기본 설정 그대로 확인해줍니다.

Begin Installation을 누르면 설치를 시작합니다. 계정 설정 화면이 나오는데 root password를 지정하고 새로운 유저도 만듭니다. 새롭게 만든 유저가 우리가 사용할 계정입니다. 유저를 만들 때 `Make this user administrator`에 체크합시다.

![User Settings](https://cdn.myeongjae.kim/blog/2018/10/initial-settings.png){.no-shadow}

![Make this user administrator](https://cdn.myeongjae.kim/blog/2018/10/new-user.png){.no-shadow}

### Themes

로그인을 할 때 톱니바퀴를 눌러 Gnome Classic 대신 Gnome을 선택합니다. 예쁘거든요.

![Gnome](https://cdn.myeongjae.kim/blog/2018/10/login-gnome.png)

그리고 `Dark mode`{.text}를 설정하기 위해 터미널을 열어서 커맨드를 입력해야 합니다. Host와 가상 머신간의 복사-붙여넣기를 연동해서 편하게 입력합시다.

`Virtualbox - Settings - General - Advanced - Shared Clipboard`를 `Bidirectional`로 선택합니다.

![Bidirectional](https://cdn.myeongjae.kim/blog/2018/10/copy-paste.png){.no-shadow}

아래 명령어를 복사한 뒤 CentOS 터미널에 붙여넣기 합니다. 터미널의 복사, 붙여넣기는 `Ctrl + Shift + C`, `Ctrl + Shift + V` 입니다.

**Step 1**: Open the GTK3 configuration file in Text Editor:

```bash
gedit ~/.config/gtk-3.0/settings.ini
```

**Step 2**: Paste this into the file opened by Text Editor:

```
[Settings]
gtk-application-prefer-dark-theme=1
```

and save it. That's all! Enjoy your dark themes 😃^1^

<p class="footnote">**1**. [How can you enable GTK3 themes' dark theme mode when using Unity 7?](https://askubuntu.com/questions/806200/how-can-you-enable-gtk3-themes-dark-theme-mode-when-using-unity-7)</p>

운영체제를 재시작하면 `Dark mode`{.text}가 적용된 CentOS를 볼 수 있습니다.

이제 터미널도 `Dark mode`{.text}로 설정합니다. 좌측 상단에 `Activities`를 누르면 좌측에 아이콘들이 올라오는데, 제일 마지막에 있는 것이 터미널입니다.

터미널을 실행하면 좌측 상단 `Activities` 옆에 `Terminal`이 생깁니다. 눌러서 `Preference`를 선택합니다.

General 탭에 `Show menubar by default in new terminals`{.text}를 체크 해제합니다. 같은 탭에 있는 `Theme variant` 드롭다운에서 `Dark`를 선택합니다.

### Network

CentOS를 종료(Shutdown)한 뒤 인터넷을 연결합니다. `Settings - Network - Adapter 1`에서 `Attached to: NAT`{.text}, `Advanced`를 눌러 `Cable Connected`에 체크합니다.

![Network Settings](https://cdn.myeongjae.kim/blog/2018/10/network-settings.png){.no-shadow}

로그인 한 뒤 우측 상단에 있는 화살표를 눌러 `Wired Off - Connect`를 누르면 인터넷 연결이 됩니다. 로그인 할 때마다 매번 눌러줘야하기 때문에 자동으로 연결하도록 설정합니다.

`Activities`를 누른 뒤 검색 바에 `network`라고 입력합니다. `Settings`의 `Network`를 선택합니다. `Wired`란의 톱니바퀴를 눌러 `Connect Automatically`를 체크한 뒤 `Apply`를 누릅니다.

![Activities - Network](https://cdn.myeongjae.kim/blog/2018/10/activites-network.png)

![Connect Automatically](https://cdn.myeongjae.kim/blog/2018/10/connect-automatically.png)

### Install Guest Additions

아마 지금 상태는 해상도 1024 * 786에 글씨들이 또렷하게 보이지 않는 상태일 것입니다. 이 상황은 2000년대 초반 컴퓨터를 포맷하고 윈도우 XP를 설치한 뒤 외장 그래픽 드라이버를 설치하지 않은 상태와 동일하다고 볼 수 있습니다. 가상 운영체제에서 host 운영체제와 하드웨어 자원을 효율적으로 쓸 수 있도록 `Guest Additions`를 설치해야 합니다.

Virtualbox 메뉴의 `Devices`탭에서 `Insert Guest Additions CD Image...`를 눌러서 설치할 수 있는데, 그 전에 개발자 도구를 설치해야 `Guest Additions`를 정상적으로 설치할 수 있습니다.

아래 명령어를 복사한 뒤 CentOS 터미널에 붙여넣기 합니다.

```bash
sudo yum -y install gcc make perl kernel-devel
sudo yum -y install kernel-devel-3.10.0-862.el7.x86_64
```

`yum`이 궁금하다면 [이 영상](https://opentutorials.org/module/2538/14180)을 봅시다. 우분투의 `apt`는 CentOS의 `yum`과 같습니다. `-y` 옵션은 설치할 때 나오는 질문들에 모두 `Yes`를 입력한다는 의미입니다.

`gcc, make, perl, kernel-devel, kernel-devel-3.10.0-862.el7.x86_64`{.text}을 모두 설치하면 이제 `Guest Additions`를 설치할 수 있습니다. `Insert Guest Additions CD Image...`를 누른 뒤 팝업에 `Yes`를 누릅니다. 이미 CD Image를 삽입한 상태라면 `Activities - Files - VBox_GAs_5...`을 선택하고 `Run Software`를 누릅니다.

![Run Software](https://cdn.myeongjae.kim/blog/2018/10/run_software.png)

`Guest Additions`를 설치한 뒤 CentOS를 종료합니다.

![Guest Additions를 설치했습니다](https://cdn.myeongjae.kim/blog/2018/10/guest-addition-installed.png)

### Virtual Hardware Settings

CentOS를 종료한 뒤 RAM, CPU와 Display를 세팅합니다. 가능한 많은 자원을 가상 머신에 할당하는 것이 좋습니다. 가상 머신의 해상도가 꽤나 높을 것이기 때문입니다.

저는 램 3GB, CPU 코어 4개, Video Memory 256MB를 할당했습니다. 제 Virtualbox는 코어 4개를 할당하니 Invalid settings detected 경고가 뜨는데, 막상 확인해보면 코어 4개를 정상적으로 사용하는 것 같았습니다.

![RAM](https://cdn.myeongjae.kim/blog/2018/10/ram.png){.no-shadow}

![CPU](https://cdn.myeongjae.kim/blog/2018/10/cpu.png){.no-shadow}

![Video Memory](https://cdn.myeongjae.kim/blog/2018/10/video-memory.png){.no-shadow}

`Display`에서 `Use Unscaled HiDPI Output`과 `Enable 3D Acceleration`을 체크합니다.

본래 Video Memory는 128MB가 최대인데, Virtualbox의 설정 파일을 직접 조작함으로써 256MB까지 높일 수 있습니다. 맥에서는 터미널에서 다음과 같이 입력하면 됩니다.

```bash
VBoxManage modifyvm "Your VM's Name" --vram 256
```

윈도우에선 command prompt(Win+R, cmd 입력 후 엔터)에서 다음과 같이 입력합니다.

```
"C:\Program Files\Oracle\VirtualBox\VBoxManage.exe" modifyvm "Your VM's Name" --vram 256
```

저는 가상 머신의 이름을 CentOS로 설정했으므로 "Your VM's Name"를 "CentOS"로 바꿔서 명령을 실행했습니다.

가상 머신을 실행하면 고해상도의 CentOS를 볼 수 있습니다. 아마 꽤나 버벅거릴텐데, 자동 배포 시스템을 구축한 뒤에는 가상 머신이 아니라 native OS에서 작업할 것이니 그 때까지만 참읍시다...

이상 CentOS를 설치하고 기본 세팅을 했습니다.