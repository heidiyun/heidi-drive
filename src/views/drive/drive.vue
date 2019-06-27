 <template>
  <div>
    <div class="toolbar">
      <div class="logo"></div>
      <div class="main-title">드라이브</div>
      <div class="search-bar">
        <div class="search-icon">
          <i class="material-icons">search</i>
        </div>
        <textarea class="search-bar-input" v-model="inputMessage" placeholder="드라이브 검색"></textarea>
        <div class="search-remove-button" v-if="inputMessage.length !== 0">
          <i class="material-icons">clear</i>
        </div>
      </div>
      <div class="blank-menu"></div>
      <div class="menu">
        <div class="user-profile-button"></div>
      </div>
    </div>
    <div class="container">
      <div class="category">
        <div class="new-folder-button">
          <i class="material-icons">add</i>새로 만들기
        </div>
        <div class="folder" v-for="(folder,i) in folderList" :key="i">{{folder}}</div>
      </div>

      <div class="content-layout">
        <div class="content-nav">
          <div class="drive-title-dropdown">
            <div
              class="drive-title-dropdown-button"
              @click="titleClicked=!titleClicked"
              :type="titleClicked ? 'clicked' : 'notclicked'"
            >
              내 드라이브
              <i class="material-icons">arrow_drop_down</i>
            </div>
            <div class="drive-title-dropdown-content" :open="titleClicked"></div>
          </div>
          <div style="flex : 1"></div>
          <div class="drive-item-filter-menu">
            <!-- <span class="timesort-up" @click="sortFileList('timeUp')">시간(오름차순) |</span>
            <span class="timesort-down" @click="sortFileList('timeDown')">시간(내림차순) |</span>
            <span class="namesort-up" @click="sortFileList('nameUp')">이름(오름차순) |</span>
            <span class="namesort-down" @click="sortFileList('nameDown')">이름(내림차순)</span>-->
            <span
              class="action-filter"
              @click="filterOption.type = 'uploadDate'; filterOption.order = filterOption.order === 'asc'? 'dsc' : 'asc'"
              :selected="filterOption.type === 'uploadDate'"
              :asc="filterOption.order === 'asc'"
            >
              시간
              <i class="material-icons">keyboard_arrow_up</i>
              |
            </span>
            <span
              class="action-filter"
              @click="filterOption.type = 'fileName'; filterOption.order = filterOption.order === 'asc'? 'dsc' : 'asc'"
              :selected="filterOption.type === 'fileName'"
              :asc="filterOption.order === 'asc'"
            >
              이름
              <i class="material-icons">keyboard_arrow_up</i>
            </span>
          </div>
          <div class="upload-button">
            <i class="material-icons" @click="uploadFile">cloud_upload</i>
          </div>
        </div>

        <div class="drive-item-container">
          <div class="drive-item-outer" v-for="(file,i) in currentFileList" :key="`${i}`">
            <div class="drive-item">
              <div
                class="drive-item-image"
                :style="{backgroundImage : `url(${file.data.fileURL})`}"
              ></div>
              <div class="drive-item-title">{{file.data.fileName}}</div>
            </div>
          </div>
        </div>
      </div>

      <div
        style="width : 58px; 
        border-left-style:solid;
         border-width : 1px;
          border-left-color: #dddddd; "
      ></div>
    </div>
  </div>
</template>

<script src="./drive.ts">
</script>

<style lang="scss" scoped>
@import './drive.scss';
</style>