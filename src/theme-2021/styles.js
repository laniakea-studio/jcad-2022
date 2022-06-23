import { createGlobalStyle } from "styled-components";
import theme from "./theme";

const GlobalStyle = createGlobalStyle`

.onetrust-close-btn-handler {
  display: none !important;
}

@-webkit-keyframes pulse {
  0% {
    transform: scale(1);
  }
  70% {
    transform: scale(1.4);
  }
  90% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  70% {
    transform: scale(1.4);
  }
  90% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}

    @keyframes ticker-kf {
      0% {
        transform: translate3d(0, 0, 0);
      }

      100% {
        transform: translate3d(-1600px, 0, 0);
      }
    }

    .img-ticker {
      animation: ticker-kf 45s linear infinite;
    }


    .sectionBox {
        position: sticky;
        top: 0;
        width: 100%;
        height: 100vh;
        box-sizing: border-box;
        padding-left: 84px;
        padding-right: 84px;
        @media (max-width: 1200px) {
            padding-left: 40px;
            padding-right: 40px;
        }
        @media (max-width: 1200px) {
            padding-left: 40px;
            padding-right: 40px;
        }
        @media (max-width: 1024px) {
            padding-left: 0;
            padding-right: 0;
        }
    }

    button.reset {
      background: none;
      border: none;
      outline: none;
      cursor: pointer;
      height: auto;
    }
    .contactForm input, .contactForm input:focus, .contactForm input:active {
        outline: none;
        border:none;
        background-image:none;
        background-color:transparent;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
    }

    .filterSelect__option:hover, .filterSelect__optio.filterSelect__option--is-focused {
        background-color: rgba(137,55,185,0.1);
    }

    button, a.button {
        min-width: 140px;
        height: 36px;
        color: #fff;
        font-size: 16px;
        letter-spacing: 1px;
        background: ${theme.purple};
        border: 2px solid ${theme.purple};
        border-radius: 4px;
        
        padding: 5px 10px;
        transition: opacity 0.2s;
        &.greyOutlines {
            background: none;
            color: ${theme.grey};
            border-color: ${theme.grey};
        }
        &:hover {
            opacity: 0.9;
        }
    }

    button.loading {        
        padding-right: 40px;
    }
    button.loading:after {
        content: "";
        position: absolute;
        border-radius: 100%;
        right: 6px;
        top: 50%;
        width: 0px;
        height: 0px;
        margin-top: -2px;
        border: 2px solid rgba(255,255,255,0.5);
        border-left-color: #FFF;
        border-top-color: #FFF;
        animation: spin .6s infinite linear, grow .3s forwards ease-out;
    }
    button.loading.greyOutlines:after {
        border-color: rgba(0,0,0,0.25) !important;
        border-left-color: rgba(0,0,0,0.5) !important;
        border-top-color: rgba(0,0,0,0.5) !important;
    }
    @keyframes spin { 
        to {
            transform: rotate(359deg);
        }
    }
    @keyframes grow { 
        to {
            width: 14px;
            height: 14px;
            margin-top: -8px;
            right: 13px;
        }
    }
    #lonelySpinner {
        display: inline-block;
        width: 20px;
        height: 20px;
        border: 3px solid rgba(137,55,185,.6);
        border-radius: 50%;
        border-top-color: #fff;
        animation: spin 1s ease-in-out infinite;
        -webkit-animation: spin 1s ease-in-out infinite;
      }      
      @keyframes spin {
        to { -webkit-transform: rotate(360deg); }
      }
      @-webkit-keyframes spin {
        to { -webkit-transform: rotate(360deg); }
      }
`;

export default GlobalStyle;
