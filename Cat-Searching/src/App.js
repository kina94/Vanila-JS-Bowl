import SearchInput from './SearchInput.js'
import { api } from './api.js'
import SearchResult from './SearchResult.js';
import ImageInfo from './ImageInfo.js';
import Loading from './Loading.js'
import SearchHistory from './SearchHistory.js'
import RandomCatBanner from './RandomCatBanner.js'
import DarkMode from './DarkMode.js';

console.log("app is running!");

export default function App($app) {
  let saveHistory = []
  const savedCatList = localStorage.getItem('catList')
  const savedSearchHistory = localStorage.getItem('searchHistory')

  ////////state initializing
  this.state = {
    data: savedCatList ? JSON.parse(savedCatList) : [],
    image: [],
    searchHistory: savedSearchHistory ? JSON.parse(savedSearchHistory) : [],
    visible: false,
    isLoading: false,
    banner: [],
  }

  ////////state update
  this.setState = (nextState) => {
    this.state = nextState
    searchInput.setState(this.state.data)
    searchResult.setState(this.state.data)
    imageInfo.setState({ image: this.state.image, visible: this.state.visible })
    loading.setState(this.state.isLoading)
    searchHistory.setState(this.state.searchHistory)
    randomCatBanner.setState(this.state.banner)
  }

  ////////function
  const randomCatBanner = new RandomCatBanner({
    $app, initialState: this.state.banner
  })

  // 검색창에 키워드를 받아 고양이 검색, 랜덤 검색
  const searchInput = new SearchInput({
    $app,
    onSearch: async (keyword) => {
      this.setState({
        ...this.state,
        isLoading: true
      })
      const catList = await fetchCats(keyword, 'search')
      this.setState({
        ...this.state,
        data: catList.data,
        isLoading: false
      })
      localStorage.setItem('catList', JSON.stringify(catList.data))
    },
    addSearchHistory: (keyword) => {
      const nextState = { ...this.state }
      if (nextState.searchHistory.length > 4) {
        nextState.searchHistory.shift()
      }
      this.setState({
        ...nextState,
        searchHistory: [...this.state.searchHistory, keyword]
      })
      saveHistory.push(keyword)
      localStorage.setItem('searchHistory', JSON.stringify(saveHistory))
    },
    onClickRandomBtn: async () => {
      this.setState({
        ...this.state,
        isLoading: true
      })
      const randomCat = await fetchCats('random50')
      this.setState({
        ...this.state,
        data: randomCat.data,
        isLoading: false
      })
      localStorage.setItem('catList', JSON.stringify(randomCat.data))
    }
  })

  //검색 기록
  const searchHistory = new SearchHistory({
    $app, initialState: this.state.searchHistory,
    onClick: async (keyword) => {
      this.setState({
        ...this.state,
        isLoading: true
      })
      const catList = await fetchCats(keyword, 'search')
      this.setState({
        ...this.state,
        data: catList.data,
        isLoading: false
      })
      localStorage.setItem('catList', JSON.stringify(catList.data))
    }
  })

  // 검색 결과 노출
  const searchResult = new SearchResult({
    $app, initialState: this.state.data,
    onClick: async (image) => {
      this.setState({
        ...this.state,
        isLoading: true
      })
      const catInfo = await fetchCats(image.id)
      this.setState({
        ...this.state,
        visible: true,
        image: catInfo.data,
        isLoading: false
      })
    },
  })

  //고양이 이미지 정보
  const imageInfo = new ImageInfo({
    $app,
    initialState: { image: this.state.image, visible: this.state.visible },
    modalClose: () => { this.setState({ ...this.state, visible: false }) }
  })

  //로딩창
  const loading = new Loading({
    $app, initialState: this.state.isLoading
  })

  //다크모드
  const darkMode = new DarkMode({$app})

  ////////API 호출
  const fetchCats = async (keyword, type) => {
    try {
      const searchCat = await api(keyword, type);
      return searchCat
    } catch (e) {
      throw new Error(e)
    }
  }

  const initBanner = async () => {
    const randomCat = await api('random50')
    this.setState({
      ...this.state,
      banner: randomCat.data.slice(0,5)
    })
  }

  initBanner()
}
