import React, {PropTypes} from 'react'
import $ from 'jquery'
import './ReactGuideTour.less'
import ArrowRight from '../svg/arrow-right.svg'
import ArrowLeft from '../svg/arrow-left.svg'
import Close from '../svg/close.svg'

export default class ReactGuideTour extends React.Component {
    static propTypes = {
        steps: PropTypes.array,
        autoPlay: PropTypes.bool,
        enableAutoPositioning: PropTypes.bool,
        enablePrevButton: PropTypes.bool,
        enableSkipButton: PropTypes.bool,
        onTourEnd: PropTypes.func
    };
    static defaultProps = {
        steps: [],
        autoPlay: false,
        enableAutoPositioning: true,
        enablePrevButton: true,
        enableSkipButton: true,
        onTourEnd () {
        }
    };

    state = {
        currentStep: -1,
        isTourActive: false,
        overlayZindex: 9999,
        overlayClass: 'tour-overlay',
        modalClass: 'tour-modal',
        arrowClass: 'tour-arrow tour-arrow-bottom',
        focusElem: null,
        oldFocusElemStyle: null
    };

    focusElemStyleProps = [
        'zIndex', 'position', 'border', 'background-color'
    ];
    modalPositions = [
        'top', 'bottom', 'right', 'left', 'center'
    ];
    arrowPositions = {
        'top': 'bottom',
        'bottom': 'top',
        'right': 'left',
        'left': 'right',
        'center': 'none'
    };
    constants = {
        MODAL_WIDTH: 320,
        MODAL_HEIGHT: 360,
        MODAL_FULL_SCREEN_WIDTH: 356,
        MODAL_FULL_SCREEN_HEIGHT: 380,
        MODAL_ARROW_W: 8,
        DISTANCE_FROM_ELEM: 10,
        OFFSET_ARROW: 5
    };

    componentDidMount = () => {
        if (this.props.autoPlay) {
            this.startTour();
        } else {
            this._tour.style.display = 'none';
        }
    };

    resizer = () => {
        var state = {
            currentStep: this.state.currentStep,
            focusElem: this.state.focusElem
        };
        this.focusOnElement(state);
    };

    startTour = () => {
        $(window).off('resize', this.resizer);
        $(window).resize(this.resizer);
        $(window).off('scroll', this.resizer);
        $(window).scroll(this.resizer);
        this._tour.style.display = 'block';

        this.setState({
            isTourActive: true,
            overlayClass: 'tour-overlay tour-active',
            modalClass: 'tour-modal tour-active'
        });
        this.goToStep(0);
    };

    nextStep = () => {
        this.goToStep(this.state.currentStep + 1);
    };

    prevStep = () => {
        this.goToStep(this.state.currentStep - 1);
    };

    goToStep = (index) => {
        if (typeof this.props.steps[index].onChange === 'function') {
            this.props.steps[index].onChange(index);
        }
        this.restoreElemStyle();
        var focusElem = this.getElement(index);
        var oldFocusStyle = {};
        if (focusElem) {
            for (var prop of this.focusElemStyleProps) {
                oldFocusStyle[prop] = focusElem.style[prop];
            }
        }
        var modalClass = 'tour-modal tour-active';
        if (index === this.props.steps.length - 1) {
            modalClass = 'tour-modal tour-active tour-end';
        }
        this.setState({
            oldFocusElemStyle: oldFocusStyle,
            focusElem: focusElem,
            modalClass: modalClass,
            currentStep: index
        });
        var state = {
            currentStep: index,
            focusElem: focusElem
        };
        var ret = this.focusOnElement(state);
        if (typeof ret.top !== 'undefined') {
            $('html, body').animate({scrollTop: ret.top}, 200);
        }
    };

    getElement = (currStep) => {
        var steps = this.props.steps;
        var focusElem;
        // Evaluating focused element
        if (typeof steps[currStep].selector === 'function') {
            focusElem = steps[currStep].selector();
        } else if (typeof steps[currStep].selector === 'string') {
            focusElem = $(steps[currStep].selector)[0];
        }
        return focusElem;
    };

    focusOnElement = (nextState) => {
        var steps = this.props.steps;
        var currStep = nextState.currentStep;
        var focusElem = nextState.focusElem;
        var ret = {};
        if (currStep < this.props.steps.length) {
            if (typeof focusElem !== 'undefined' && focusElem !== null) {
                // Set focused element new style
                focusElem.style.zIndex = (this.state.overlayZindex + 1).toString();
                focusElem.style.position = focusElem.style.position === 'absolute' ? 'absolute' : 'relative';
                //focusElem.style.borderRadius = '2px';
                //focusElem.style.boxShadow = '0 0 3px rgba(0,0,0,.5)';
                var border = '2px solid #fdc02f';
                if (steps[currStep].style && steps[currStep].style.border) {
                    border = steps[currStep].style.border;
                }
                focusElem.style.border = border;

                if (steps[currStep].style && steps[currStep].style['background-color']) {
                    focusElem.style['background-color'] = steps[currStep].style['background-color'];
                }
            }
            // Evaluating modal position
            var modalPosition = 'top';
            if (typeof steps[currStep].modalPosition === 'string') {
                if (this.modalPositions.indexOf(steps[currStep].modalPosition) !== -1) {
                    modalPosition = steps[currStep].modalPosition;
                }
            }
            var elemTop = 0;
            var elemLeft = 0;
            var elemW = 0;
            var elemH = 0;
            if ($(focusElem) && $(focusElem).offset()) {
                elemTop = $(focusElem).offset().top;
                elemLeft = $(focusElem).offset().left;
                elemW = focusElem.offsetWidth;
                elemH = focusElem.offsetHeight;
            }

            var winW = $(window).width();
            var winH = $(window).height();
            // Check and eventually correct modal position (change if bool enabled and for lack of space)
            if (this.props.enableAutoPositioning ) {
                var positionEnabled = {};
                positionEnabled['top'] = (elemTop > 150 && (winW - elemLeft > this.constants.MODAL_WIDTH));
                positionEnabled['left'] = (elemLeft > this.constants.MODAL_WIDTH && ($(window).height() - elemTop > 150));
                positionEnabled['right'] = ((winW - elemLeft - elemW > this.constants.MODAL_WIDTH) && (winH - elemTop > 150));
                positionEnabled['bottom'] = ((winH - elemTop - elemH > this.constants.MODAL_WIDTH) && (winW - elemLeft > this.constants.MODAL_WIDTH));
                positionEnabled['center'] = true;
                if (!positionEnabled[modalPosition]) {
                    ['top', 'left', 'right', 'bottom', 'center'].forEach((prop) => {
                        if (!positionEnabled[modalPosition] && positionEnabled[prop]) {
                            modalPosition = prop;
                        }
                    })
                }
            }
            // Calculate modal position in window
            var top, left, width, adjustTop;
            var bottom = 'initial';
            var height = 'auto';
            var modalPad = parseInt($(this._modal).css('padding-left').replace('px', ''), 10) * 2;
            var scrollTop = window.pageYOffset;
            var scrollLeft = window.pageXOffset;
            switch (modalPosition) {
                case 'bottom':
                    top = (elemTop + elemH + this.constants.MODAL_ARROW_W + this.constants.DISTANCE_FROM_ELEM - scrollTop).toString() + 'px';
                    left = elemLeft + this.constants.OFFSET_ARROW - scrollLeft;
                    break;
                case 'top':
                    top = (elemTop - this.constants.MODAL_HEIGHT - this.constants.MODAL_ARROW_W - this.constants.DISTANCE_FROM_ELEM - scrollTop).toString() + 'px';
                    left = elemLeft + this.constants.OFFSET_ARROW - scrollLeft;
                    break;
                case 'right':
                    adjustTop = elemTop - this.constants.OFFSET_ARROW - scrollTop > this.constants.OFFSET_ARROW ? elemTop - this.constants.OFFSET_ARROW - scrollTop : this.constants.OFFSET_ARROW;
                    top = adjustTop.toString() + 'px';
                    left = elemLeft + elemW + this.constants.MODAL_ARROW_W + this.constants.DISTANCE_FROM_ELEM - scrollLeft;
                    break;
                case 'left':
                    adjustTop = elemTop - this.constants.OFFSET_ARROW - scrollTop > this.constants.OFFSET_ARROW ? elemTop - this.constants.OFFSET_ARROW - scrollTop : this.constants.OFFSET_ARROW;
                    top = adjustTop.toString() + 'px';
                    left = elemLeft - this.constants.MODAL_WIDTH - this.constants.MODAL_ARROW_W - this.constants.DISTANCE_FROM_ELEM - modalPad - scrollLeft;
                    break;
                case 'center':
                    if (nextState.currentStep === steps.length - 1) { //tour end
                        top = "calc(50% - " + this.constants.MODAL_FULL_SCREEN_WIDTH /2 + "px)";
                        left = "calc(50% - " + this.constants.MODAL_FULL_SCREEN_HEIGHT / 2 + "px)";
                    } else {
                        top = "calc(50% - " + this.constants.MODAL_WIDTH /2 + "px)";
                        left = "calc(50% - " + this.constants.MODAL_HEIGHT / 2 + "px)";
                    }

                    break;
            }
            this._modal.style.top = top;
            //this._modal.style.bottom = bottom;
            if (modalPosition === 'center') {
                this._modal.style.left = left;
            } else {
                this._modal.style.left = Math.floor(left).toString() + 'px';
            }

            // Set modal arrow position based on modal position
            var arrowClass = 'tour-arrow tour-arrow-' + this.arrowPositions[modalPosition];
            this.setState({
                arrowClass: arrowClass
            });
            ret = {
                top: top !== 'initial' ? Math.min(parseInt(top.replace('px', ''), 10), elemTop) - 20 : elemTop - 20
            }
        }
        return ret;
    };

    restoreElemStyle = () => {
        if (typeof this.state.focusElem !== 'undefined' && this.state.focusElem !== null) {
            for (var prop of this.focusElemStyleProps) {
                this.state.focusElem.style[prop] = this.state.oldFocusElemStyle[prop];
            }
        }
    };

    dismissTour = () => {
        $(window).off('resize', this.resizer);
        $(window).off('scroll', this.resizer);
        this.restoreElemStyle();
        this.setState({
            isTourActive: false,
            overlayClass: 'tour-overlay',
            modalClass: 'tour-modal',
            focusElem: null,
            oldFocusElemStyle: null
        });
        setTimeout(() => {
            this._tour.style.display = 'none'
        }, 300);
        this.props.onTourEnd();
    };

    getIconClassName = (index) => {
        return this.state.currentStep === index ? 'tour-step-icon tour-step-icon-active' : 'tour-step-icon';
    };

    render = () => {
        return (
            <div ref={(c) => this._tour = c} className='react-guide-tour'>
                <div className={this.state.overlayClass} onClick = {this.props.enableSkip ? this.dismissTour : ""} 
                     style={{zIndex: this.state.overlayZindex}}/>
                <div ref={(c) => this._modal = c} className={this.state.modalClass} style={{zIndex: this.state.overlayZindex + 1}}>
                    <div className={this.state.arrowClass}></div>

                    {
                        (this.state.currentStep > -1 && this.state.isTourActive) ? (
                            <div className='tour-message-container'>
                                <div className="tour-message-image">
                                    <img src={this.props.steps[this.state.currentStep].image} />
                                </div>
                                <div className="tour-message-text">
                                    {this.props.steps[this.state.currentStep].message}
                                </div>
                            </div>
                        ) : (
                            null
                        )
                    }
                    {
                        this.state.currentStep < this.props.steps.length - 1 ? (

                            <div className='tour-button-container'>
                                {
                                    (this.state.currentStep > 0 && this.props.enablePrevButton) ? (
                                        <button className='tour-prev-button' onClick={this.prevStep}><ArrowLeft /></button>
                                    ) : (
                                        null
                                    )
                                }
                                <div className='tour-steps-container'>
                                    <div className='tour-steps-icons-container'>
                                        {
                                            this.props.steps.map(function (step, index) {
                                                return (
                                                    <div onClick={this.goToStep.bind(this, index)}
                                                         className={this.getIconClassName.bind(this, index)()}
                                                         key={index}></div>
                                                )
                                            }, this)
                                        }
                                    </div>
                                    {
                                        this.props.enableSkipButton ? (
                                            <button className='tour-skip-button' onClick={this.dismissTour}><Close /></button>
                                        ) : (null)
                                    }

                                </div>
                                <button className='tour-next-button' onClick={this.nextStep}><ArrowRight /></button>
                            </div>
                        ) : (
                            <div className='tour-button-container'>
                                <button onClick={this.dismissTour} className="btn-tour-end">
                                    {this.props.steps[this.state.currentStep].btnText || "Let's Start"}
                                </button>
                            </div>
                        )
                    }

                </div>
            </div>
        )
    };
}
