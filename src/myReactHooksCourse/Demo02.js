import React, { PureComponent, useState, useEffect } from 'react';

const withWindowSize = (Component) => {
  // 产生一个高阶组件 WrappedComponent，只包含监听窗口大小的逻辑
  class WrappedComponent extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        size: this.getSize(),
      };
    }

    componentDidMount() {
      window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize);
    }

    getSize() {
      return window.innerWidth > 1200 ? 'large' : 'small';
    }

    handleResize = () => {
      this.setState({
        size: this.getSize(),
      });
    };

    render() {
      // 将窗口大小传递给真正的业务逻辑组件
      return <Component size={this.state.size} />;
    }
  }

  return WrappedComponent;
};

class MyComponent extends PureComponent {
  render() {
    const { size } = this.props;
    if (size === 'small') return '<SmallComponent />';
    else return '<LargeComponent />';
  }
}

// 使用 withWindowSize 产生高阶组件，用于产生 size 属性传递给真正的业务组件
// export default withWindowSize(MyComponent);
const EnhancedComponent = withWindowSize(MyComponent);
//
//
//
//
//
// ! 逻辑抽离直接调用，减少嵌套
const getSize = () => {
  return window.innerWidth > 1200 ? 'large' : 'small';
};

const useWindowSize = () => {
  const [size, setSize] = useState(getSize());

  useEffect(() => {
    const handler = () => {
      setSize(getSize());
    };

    window.addEventListener('resize', handler);
    return () => {
      // useEffect 还允许你返回一个函数，用于在组件销毁的时候做一些清理的操作。比如移除事件的监听
      window.removeEventListener('resize', handler);
    };
  }, []);

  return size;
};

const Demo = () => {
  const size = useWindowSize();
  if (size === 'small') return 'hooks <SmallComponent />';
  else return 'hooks <LargeComponent />';
};

export default () => (
  <>
    <EnhancedComponent />
    <br />
    <br />
    <Demo />
  </>
);
