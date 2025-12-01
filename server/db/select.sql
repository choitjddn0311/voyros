-- 임시저장글 가져오기
select title, content from temporaily_post where id = '로그인된 아이디';

-- 내 글 가져오기 (화면에)
select title, post_text from post where id = '로그인된 아이디';

-- 최신 포스팅으로 정렬하기
select * from post order by created_at desc;

-- 내 글 가져오기 (아이디랑 같이)
select p.id, u.name, p.title, p.content, p.created_at from post p, user u where p.id = u.id  and title = '클릭된 카드의 타이틀'

-- 관리자 바꾸기 예시
UPDATE user SET role = 'admin' WHERE id = 'admin';

-- db에 직접 insert하면 비번 암호화 안되서 페이지에서 회원가입 후 admin account role update
update user set role = "admin" where id="admin";
