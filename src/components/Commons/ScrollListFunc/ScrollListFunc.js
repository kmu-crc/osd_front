import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.ul`
    background: #FFFFFF;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    // border: 1px solid red;
`;
const Element = styled.li`
    flex: 0;
    margin-right: 45px;
    .last {
        margin-right: 41px;
    }
    margin-bottom: 139px;
`;

export default function ScrollListFunc(props) {
    const [more, setMore] = useState(true);
    const getmore = () => {
        if (props.getmore) {
            props.getmore();
        } else {
            setMore(false);
        }
    };
    useEffect(() => { more ? getmore() : null }, [more]);
    useEffect(() => {
        const list = document.getElementById('list');
        window.addEventListener('scroll', () => {
            if (window.scrollY + 72 === list.clientHeight) {
                getmore();
            }
        });
        return () => {
            window.removeEventListener('scroll', () => { });
        }
    }, []);
    useEffect(() => {
        const list = document.getElementById('list');
        if (list.clientHeight <= window.innerHeight && list.clientHeight) {
            setMore(true);
        }
    }, [props.state]);
    const { ListComponent, cols } = props;
    return (
        <Container id='list'>
            {props.dataListAdded.map((item, key) =>
                <Element key={key} className={key % cols === cols - 1 ? "last" : ""}>
                    {<ListComponent data={item} />}
                </Element>)}
        </Container>
    )
}