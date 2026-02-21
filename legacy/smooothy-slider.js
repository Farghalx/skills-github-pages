/**
 * Smooothy Slider - Core Library
 * A lightweight, flexible slider library adapted for vanilla JavaScript
 */

class SmooothyCore {
  constructor(wrapper, config = {}) {
    this.wrapper = wrapper
    this.items = [...wrapper.children]

    this.config = {
      infinite: true,
      draggable: true,
      animationSpeed: 0.8,
      friction: 0.15,
      threshold: 50,
      ...config
    }

    this.currentIndex = 0
    this.targetIndex = 0
    this.currentPosition = 0
    this.targetPosition = 0
    this.isDragging = false
    this.startX = 0
    this.startY = 0
    this.dragDelta = 0
    this.isVisible = true
    this.itemWidth = 0

    this.onSlideChange = () => {}

    this.init()
  }

  init() {
    this.setupStyles()
    this.setupEvents()
    this.updateDimensions()
    this.startAnimationLoop()
  }

  setupStyles() {
    this.wrapper.style.display = 'flex'
    this.wrapper.style.cursor = 'grab'
    this.wrapper.style.userSelect = 'none'
    this.wrapper.style.position = 'relative'

    this.items.forEach(item => {
      item.style.flexShrink = '0'
      item.style.width = '100%'
    })
  }

  setupEvents() {
    if (this.config.draggable) {
      this.wrapper.addEventListener('mousedown', this.handleMouseDown.bind(this))
      this.wrapper.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true })

      window.addEventListener('mousemove', this.handleMouseMove.bind(this))
      window.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false })

      window.addEventListener('mouseup', this.handleMouseUp.bind(this))
      window.addEventListener('touchend', this.handleTouchEnd.bind(this))
    }

    window.addEventListener('resize', this.updateDimensions.bind(this))
  }

  handleMouseDown(e) {
    this.isDragging = true
    this.startX = e.clientX
    this.startY = e.clientY
    this.wrapper.style.cursor = 'grabbing'
  }

  handleTouchStart(e) {
    this.isDragging = true
    this.startX = e.touches[0].clientX
    this.startY = e.touches[0].clientY
  }

  handleMouseMove(e) {
    if (!this.isDragging) return

    const currentX = e.clientX
    const deltaX = currentX - this.startX

    this.dragDelta = deltaX
    this.targetPosition = -this.targetIndex * this.itemWidth + deltaX
  }

  handleTouchMove(e) {
    if (!this.isDragging) return

    const currentX = e.touches[0].clientX
    const deltaX = currentX - this.startX

    this.dragDelta = deltaX
    this.targetPosition = -this.targetIndex * this.itemWidth + deltaX
  }

  handleMouseUp() {
    if (!this.isDragging) return

    this.isDragging = false
    this.wrapper.style.cursor = 'grab'

    if (Math.abs(this.dragDelta) > this.config.threshold) {
      if (this.dragDelta > 0) {
        this.goToPrev()
      } else {
        this.goToNext()
      }
    } else {
      this.goToIndex(this.targetIndex)
    }

    this.dragDelta = 0
  }

  handleTouchEnd() {
    this.handleMouseUp()
  }

  updateDimensions() {
    this.itemWidth = this.wrapper.offsetWidth
  }

  goToNext() {
    const newIndex = this.targetIndex + 1
    if (this.config.infinite) {
      this.goToIndex(newIndex)
    } else {
      if (newIndex < this.items.length) {
        this.goToIndex(newIndex)
      }
    }
  }

  goToPrev() {
    const newIndex = this.targetIndex - 1
    if (this.config.infinite) {
      this.goToIndex(newIndex)
    } else {
      if (newIndex >= 0) {
        this.goToIndex(newIndex)
      }
    }
  }

  goToIndex(index) {
    const previousIndex = this.targetIndex

    if (this.config.infinite) {
      // Handle infinite looping
      const total = this.items.length
      let normalizedIndex = index % total
      if (normalizedIndex < 0) normalizedIndex += total

      this.currentIndex = normalizedIndex
      this.targetIndex = index
    } else {
      this.currentIndex = Math.max(0, Math.min(index, this.items.length - 1))
      this.targetIndex = this.currentIndex
    }

    this.targetPosition = -this.targetIndex * this.itemWidth

    if (previousIndex !== this.currentIndex) {
      this.onSlideChange(this.currentIndex, previousIndex)
    }
  }

  update() {
    if (!this.isDragging) {
      const distance = this.targetPosition - this.currentPosition
      this.currentPosition += distance * this.config.friction

      // Snap to position when very close
      if (Math.abs(distance) < 0.1) {
        this.currentPosition = this.targetPosition
      }
    }

    this.wrapper.style.transform = `translate3d(${this.currentPosition}px, 0, 0)`
  }

  startAnimationLoop() {
    const animate = () => {
      this.update()
      requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }

  destroy() {
    window.removeEventListener('resize', this.updateDimensions)
    // Add more cleanup as needed
  }
}

/**
 * Extended Slider with Controls, Keyboard, and Link Handling
 */
class SmooothySlider extends SmooothyCore {
  constructor(container, config = {}) {
    const sliderElement = container.querySelector('[data-slider]')
    super(sliderElement, config)

    this.container = container

    // Setup interface elements
    const interfaceElement = container.querySelector('[data-interface]')
    if (interfaceElement) {
      this.createInterface(interfaceElement)
    }

    // Setup keyboard controls
    this.addKeyboardEvents()

    // Setup link handling
    this.handleLinks()

    // Set initial active states
    this.onSlideChange = (current, previous) => {
      this.handleSlideChange(current, previous)
    }

    this.handleSlideChange(0, 0)
  }

  createInterface(interfaceElement) {
    const dotsContainer = interfaceElement.querySelector('[data-dots]')
    const arrowsContainer = interfaceElement.querySelector('[data-arrows]')

    if (dotsContainer) {
      this.dots = [...dotsContainer.children]
      this.dots.forEach((dot, index) => {
        dot.onclick = () => this.goToIndex(index)
      })
    }

    if (arrowsContainer) {
      const arrows = [...arrowsContainer.children]
      arrows.forEach((arrow, index) => {
        arrow.onclick = () => index === 0 ? this.goToPrev() : this.goToNext()
      })
    }
  }

  handleSlideChange(current, previous) {
    // Update active classes on items
    if (this.items[previous]) {
      const prevElement = this.items[previous].querySelector('[data-slide-content]')
      if (prevElement) prevElement.classList.remove('active')
    }

    if (this.items[current]) {
      const currentElement = this.items[current].querySelector('[data-slide-content]')
      if (currentElement) currentElement.classList.add('active')
    }

    // Update dots
    if (this.dots) {
      if (this.dots[previous]) {
        const prevDot = this.dots[previous].querySelector('[data-dot]')
        if (prevDot) prevDot.classList.remove('active-dot')
      }

      if (this.dots[current]) {
        const currentDot = this.dots[current].querySelector('[data-dot]')
        if (currentDot) currentDot.classList.add('active-dot')
      }
    }
  }

  handleKeydown = (e) => {
    if (!this.isVisible) return

    // Handle number keys (0-9)
    if (/^[0-9]$/.test(e.key)) {
      const slideIndex = parseInt(e.key)
      if (this.config.infinite) {
        this.goToIndex(slideIndex)
      } else {
        if (slideIndex < this.items.length) {
          this.goToIndex(slideIndex)
        }
      }
      return
    }

    // Handle arrow keys and spacebar
    switch (e.key) {
      case 'ArrowLeft':
        this.goToPrev()
        break
      case 'ArrowRight':
        this.goToNext()
        break
      case ' ':
        e.preventDefault()
        this.goToNext()
        break
    }
  }

  addKeyboardEvents() {
    window.addEventListener('keydown', this.handleKeydown)
  }

  handleLinks() {
    [...this.wrapper.querySelectorAll('a')].forEach((link) => {
      let startX = 0
      let startY = 0
      let startTime = 0
      let isDragging = false

      link.style.pointerEvents = 'none'

      const handleMouseDown = (e) => {
        startX = e.clientX
        startY = e.clientY
        startTime = Date.now()
        isDragging = false
      }

      const handleMouseMove = (e) => {
        if (!startTime) return

        const deltaX = Math.abs(e.clientX - startX)
        const deltaY = Math.abs(e.clientY - startY)

        if (deltaX > 5 || deltaY > 5) {
          isDragging = true
        }
      }

      const handleMouseUp = (e) => {
        const deltaTime = Date.now() - startTime

        if (!isDragging && deltaTime < 200) {
          link.click()
        }

        startTime = 0
        isDragging = false
      }

      link.parentElement.addEventListener('mousedown', handleMouseDown)
      link.parentElement.addEventListener('mousemove', handleMouseMove)
      link.parentElement.addEventListener('mouseup', handleMouseUp)
    })
  }

  destroy() {
    super.destroy()
    window.removeEventListener('keydown', this.handleKeydown)
  }
}

// Make it available globally
window.SmooothySlider = SmooothySlider
